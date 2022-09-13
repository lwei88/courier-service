const Package = require('../shared/Package');
const Trip = require('./Trip');
const { byDeliverFirst, byHeavierPackages, byMaxPackages, lowerThanMaxCarriableWeight } = require('./DeliveryCriteria');
const getCombinations = require('../helpers/getCombinations');

/**
 * Get all different combinations of packages.
 * @param {Package[]} packages array of packages.
 * @return {Trip[]} all trip that carry different combination of packages.
 */
function getTrips(packages) {
  const pkgIds = packages.map((pkg) => pkg.id);
  const pkgCombinations = getCombinations(pkgIds).reverse();

  const trips = pkgCombinations.map((pkgIds) => new Trip(packages.filter((pkg) => pkgIds.includes(pkg.id))));
  return trips;
}

/**
 * Remove trip when there are packages carried by a higher ranked trip. So every trip will not repeat the same package.
 * @param {Trip[]} trips array of trips.
 * @return {Trip[]} trip array of trips without repeated package.
 */
function removeTripWithDuplicatedPackage(trips) {
  const result = [];
  while (trips.length > 0) {
    result.push(trips[0]);
    trips[0].packages.forEach((pkg) => {
      trips = trips.filter((x) => !x.packages.includes(pkg));
    });
  }
  return result;
}

class TripPlanner {
  constructor(maxWeight) {
    this.maxWeight = maxWeight;
  }

  /**
   * Perform business requirement, each trip will carry max weight defined. All trips will be sorted in according the delivery criteria. The later the sorting criteria means the higher priority.
   * Example: Max Packages will be prioritized compare with, Heavier packages. And Heavier packages will be prioritized compared with package deliver first.
   * @param {Trip[]} trips array of trips.
   * @return {Trip[]} trip array of trips without repeated package.
   */
  prioritizeTrips(trips) {
    return trips
      .filter(lowerThanMaxCarriableWeight(this.maxWeight))
      .sort(byDeliverFirst)
      .sort(byHeavierPackages)
      .sort(byMaxPackages);
  }

  /**
   * Plan trips according to the packages. Where the trips to be used by the vehicle to perform delivery.
   *
   * @param {Package[]} packages array of packages.
   * @return {Trip[]} trip array of trips.
   */
  plan(packages) {
    let trips = getTrips(packages);
    trips = this.prioritizeTrips(trips);
    trips = removeTripWithDuplicatedPackage(trips);

    return trips;
  }
}

module.exports = TripPlanner;
