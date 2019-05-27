const {
    wholeBillDiscount,
    standingChargeDiscount,
    tierOneDiscount,
} = require('./discount');
const {standingChargeAmount} = require("./common");
const {VAT_RATE} = require('../constants');

/**
 * Calculate the Plan Summaries and Prices for a given Energy Usage amount.
 *
 * @param {Number} energyUsage
 * @param {Object} plans
 * @returns {Array}
 */
const price = (energyUsage, plans) =>
    plans
        .map(planData => {
            const {
                supplier,
                plan,
            } = planData;

            const priceExVat = calculatePrice(planData, energyUsage) - wholeBillDiscount(planData) - standingChargeDiscount(planData);//wholeBillDiscount(planData);

            const priceIncVat = Math.round(priceExVat * VAT_RATE) / 100;

            return {supplier, plan, price: priceIncVat};
        })
        .sort((planA, planB) => planA.price - planB.price)
        .map(formatSummary);


/**
 * Calculates the Price from the given energyUsage and planData.
 *
 * @param {Object} planData
 * @param {Number} energyUsage
 * @returns {Number}
 */
const calculatePrice = (planData, energyUsage) => {
    const currentPrice = standingChargeAmount(planData);//standingChargeAmountWithDiscount(planData) : 0;

    let currentEnergyUsage = energyUsage;

    return planData.rates
        .reduce((accumulator, currentRate, currentRateIndex) => {
            // Remove first rate tier discount
            if (currentRateIndex === 0) {
                accumulator = accumulator - tierOneDiscount(planData, currentEnergyUsage);
            }

            if (!currentRate.threshold || currentEnergyUsage < currentRate.threshold) {
                accumulator = accumulator + (currentEnergyUsage * currentRate.price);
                currentEnergyUsage = 0;

                return accumulator;
            }

            // Decrement the currentRate.threshold from the currentEnergyUsage value
            currentEnergyUsage = currentEnergyUsage - currentRate.threshold;

            return accumulator + (currentRate.threshold * currentRate.price);
        }, currentPrice);
};

/**
 * Format a Summary to a string.
 *
 * @param {Object} summary
 * @returns {String}
 */
const formatSummary = summary => `${summary.supplier},${summary.plan},${summary.price}`;

module.exports = price;
