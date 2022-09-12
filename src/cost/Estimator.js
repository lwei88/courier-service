const discount = require('./discount');

const deliveryCost = (baseDeliveryCost, pkgTotalWeight, distance) => {
  return baseDeliveryCost + pkgTotalWeight * 10 + distance * 5;
};

class Estimator {
  constructor(baseDeliveryCost, deliveryCostFunction = deliveryCost) {
    this.baseDeliveryCost = baseDeliveryCost;
    this.deliveryCostFunction = deliveryCostFunction;
  }

  estimate(pkgs) {
    return pkgs.reduce((result, pkg) => {
      const cost = this.deliveryCostFunction(this.baseDeliveryCost, pkg.weight, pkg.distance);
      const disc = cost * discount(pkg);

      if (!result[pkg.id]) result[pkg.id] = { discount: Math.round(disc), totalCost: Math.round(cost - disc) };

      return result;
    }, {});
  }
}

module.exports = Estimator;
