const discount = require('./discount');

const deliveryCost = (baseDeliveryCost, pkgTotalWeight, distance) => {
  return baseDeliveryCost + pkgTotalWeight * 10 + distance * 5;
};

class Estimator {
  constructor(baseDeliveryCost, deliveryCostFunction = deliveryCost) {
    this.baseDeliveryCost = baseDeliveryCost;
    this.deliveryCostFunction = deliveryCostFunction;
  }

  estimate(packages) {
    return packages.reduce((prev, curr) => {
      const cost = this.deliveryCostFunction(this.baseDeliveryCost, curr.pkgTotalWeight, curr.distance);
      const disc = cost * discount(curr.pkgTotalWeight, curr.distance, curr.offerCode);

      if (!prev[curr.pkgId]) prev[curr.pkgId] = { discount: Math.round(disc), totalCost: Math.round(cost - disc) };

      return prev;
    }, {});
  }
}

module.exports = Estimator;
