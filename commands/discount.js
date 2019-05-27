const { DAYS_IN_YEAR , DISCOUNTS } = require('../constants');

const wholeBillDiscount = planData => {
    const {
        discounts,
    } = planData;

    return discounts
        .filter(discount => discount.applies_to === DISCOUNTS.WHOLE_BILL)
        .reduce((acc, discount) => acc + discount.value, 0)
};

const tierOneDiscount = (planData, energyUsage) => {
    const {
        discounts,
    } = planData;

    return discounts
        .filter(discount => discount.applies_to === DISCOUNTS.TIER_1_RATES)
        .reduce((acc, discount) => {
            const rateOne = planData.rates[0];

            if (rateOne.threshold && rateOne.threshold < energyUsage) {
                return rateOne.threshold * discount.value;
            }

            if (energyUsage * discount.value < discount.cap) {
                return energyUsage * discount.value;
            }

            return discount.cap;
        }, 0)
};

const standingChargeDiscount = planData => {
    const {
        standing_charge,
        discounts,
    } = planData;

    return discounts.filter(discount => discount.applies_to === DISCOUNTS.STANDING_CHARGE)
        .reduce((acc, discount) => acc + (standing_charge * DAYS_IN_YEAR * (discount.value / 100)), 0)
};

const standingChargeAmountWithDiscount = planData => {
    const {
        standing_charge,
        discounts,
    } = planData;

    const standingChargeDiscounts = discounts.filter(discount => discount.applies_to === DISCOUNTS.STANDING_CHARGE);

    // Standing charge without discount
    if (standingChargeDiscounts.length === 0) {
        return planData.standing_charge * DAYS_IN_YEAR;
    }

    // Standing charge with standing charge discount
    return standingChargeDiscounts
        .reduce((acc, discount) => acc + (standing_charge * DAYS_IN_YEAR * (1 - (discount.value / 100))), 0)
};

const discount = (planData, energyUsage) => {
    return wholeBillDiscount(planData) + tierOneDiscount(planData, energyUsage) + standingChargeDiscount(planData);
};

module.exports = {
    wholeBillDiscount,
    tierOneDiscount,
    standingChargeDiscount,
};