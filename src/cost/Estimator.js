const discount = require('./discount');
const round = require('../helpers/round');

function deliveryCost(baseDeliveryCost, pkgTotalWeight, distance) {
  return baseDeliveryCost + pkgTotalWeight * 10 + distance * 5;
}

class Estimator {
  constructor(baseDeliveryCost, deliveryCostFunction = deliveryCost) {
    this.baseDeliveryCost = baseDeliveryCost;
    this.deliveryCostFunction = deliveryCostFunction;
  }

  estimate(pkgs) {
    return pkgs.reduce((result, pkg) => {
      const cost = this.deliveryCostFunction(this.baseDeliveryCost, pkg.weight, pkg.distance);
      const disc = cost * discount(pkg);

      if (!result[pkg.id]) result[pkg.id] = { discount: round(disc), totalCost: round(cost - disc) };
      return result;
    }, {});
  }
}

module.exports = Estimator;
