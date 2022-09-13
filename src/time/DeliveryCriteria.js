const Trip = require('./Trip');

/**
 * Returns negative, zero or positive numeric value, used for sortting.
 *
 * @param {Trip} tripA The array consists of list of unique string.
 * @param {Trip} tripB The array consists of list of unique string.
 * @return {number} return negative numeric value, a is sorted before b. return zero, no changes. return positive numeric value, b is sorted before a.
 */
function byMaxPackages(tripA, tripB) {
  return tripB.noPackages - tripA.noPackages;
}

/**
 * Returns negative, zero or positive numeric value, used for sortting.
 *
 * @param {Trip} tripA The array consists of list of unique string.
 * @param {Trip} tripB The array consists of list of unique string.
 * @return {number} return negative numeric value, a is sorted before b. return zero, no changes. return positive numeric value, b is sorted before a.
 */
function byHeavierPackages(tripA, tripB) {
  return tripB.weight - tripA.weight;
}

/**
 * Returns negative, zero or positive numeric value, used for sortting.
 *
 * @param {Trip} tripA The array consists of list of unique string.
 * @param {Trip} tripB The array consists of list of unique string.
 * @return {number} return negative numeric value, a is sorted before b. return zero, no changes. return positive numeric value, b is sorted before a.
 */
function byDeliverFirst(tripA, tripB) {
  return tripA.minDistance - tripB.minDistance;
}

/**
 * Returns a function to filter weight is larger than the maxWeight.
 *
 * @param {number} maxWeight The array consists of list of unique string.
 * @return {Function} function used to filter weight larger than the maxWeight.
 */
function lowerThanMaxCarriableWeight(maxWeight) {
  return function (trip) {
    return trip.weight <= maxWeight;
  };
}

module.exports.byMaxPackages = byMaxPackages;
module.exports.byHeavierPackages = byHeavierPackages;
module.exports.byDeliverFirst = byDeliverFirst;

module.exports.lowerThanMaxCarriableWeight = lowerThanMaxCarriableWeight;
