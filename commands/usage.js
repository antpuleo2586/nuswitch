const {
    wholeBillDiscount,
    standingChargeDiscount,
    tierOneDiscount,
} = require('./discount');
const { standingChargeAmount } = require('./common');
const { MONTHS_IN_YEAR, VAT_RATE, DISCOUNTS } = require('../constants');

/**
 * Get the Energy Usage from a given Plan.
 *
 * @param {Object} plan
 * @param {Array} plans
 * @returns {Number}
 */
const usage = (plan, plans) => {
    const planData = plans.find(p => p.supplier === plan.supplier && p.plan === plan.plan);
    if (!planData) {
        throw new Error(`No plan data for supplier ${plan.supplier}!`);
    }

    const priceIncVat = plan.price * MONTHS_IN_YEAR * 100;
    const priceExVat = (priceIncVat / VAT_RATE) + wholeBillDiscount(planData) + standingChargeDiscount(planData);

    return calculateEnergyUsage(priceExVat, planData);
};

/**
 * Calculate the Energy Usage from the given price and planData.
 *
 * @param {Number} price
 * @param {Object} planData
 * @returns {Number}
 */
const calculateEnergyUsage = (price, planData) => {
    const currentEnergyUsage = 0;
    let currentPrice = price - standingChargeAmount(planData);

    return planData.rates
        .reduce((accumulator, currentRate, currentRateIndex) => {
            let currentRatePrice = currentRate.price;
//10114.29, 113.29
            // If first rate tier, add discount back
            // if (currentRateIndex === 0) {
            //     currentPrice = currentPrice + tierOneDiscount(planData, currentRate.threshold);
            // }

            if (currentRateIndex === 0) {
                const discount = planData.discounts.find(discount => discount.applies_to === DISCOUNTS.TIER_1_RATES);

                if (discount) {
                    currentRatePrice = currentRate.price - discount.value;
                }
            }

            if (!currentRate.threshold || Math.round(currentPrice / currentRatePrice) < currentRate.threshold) {
                accumulator = accumulator + Math.round(currentPrice / currentRatePrice);
                currentPrice = 0;

                return accumulator;
            }

            // Decrement the price for the currentRate.threshold from the currentPrice
            currentPrice = currentPrice - (currentRate.threshold * currentRatePrice);

            return accumulator + currentRate.threshold;
        }, currentEnergyUsage);
};

module.exports = usage;
