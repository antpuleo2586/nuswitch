const { DAYS_IN_YEAR } = require("../constants");

const standingChargeAmount = planData => {
    return planData.standing_charge ? planData.standing_charge * DAYS_IN_YEAR : 0
};

module.exports = {
    standingChargeAmount,
};
