const discount = require('./discount');

const deliveryCost = (baseDeliveryCost, pkgTotalWeight, distance) => {
  return baseDeliveryCost + pkgTotalWeight * 10 + distance * 5;
};

class Estimator {
  constructor(baseDeliveryCost, deliveryCostFunction = deliveryCost) {
    this.baseDeliveryCost = baseDeliveryCost;
    this.deliveryCostFunction = deliveryCostFunction;
  }

  estimate(pkgTotalWeight, distance, offerCode) {
    const cost = this.deliveryCostFunction(this.baseDeliveryCost, pkgTotalWeight, distance);
    const disc = cost * discount(pkgTotalWeight, distance, offerCode);
    return { discount: Math.round(disc), totalCost: Math.round(cost - disc) };
  }
}

module.exports = Estimator;
