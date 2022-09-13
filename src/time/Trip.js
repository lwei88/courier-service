const sum = require('../helpers/sum');

class Trip {
  constructor(packages) {
    this.packages = packages;
    this.noPackages = packages.length;
    this.minDistance = Math.min(...packages.map((pkg) => pkg.distance));
    this.maxDistance = Math.max(...packages.map((pkg) => pkg.distance));
    this.weight = sum(packages.map((pkg) => pkg.weight));
  }
}

module.exports = Trip;
