const DeliveryRecord = require('./DeliveryRecord');
const TripPlanner = require('./TripPlanner');
const Vehicle = require('./Vehicle');

class Estimator {
  constructor(noOfVehicles, maxSpeed, maxWeight) {
    this.vehicles = new Array(noOfVehicles).fill().map(() => new Vehicle(maxSpeed));
    this.planner = new TripPlanner(maxWeight);
  }

  /**
   * Get the next available vehicle (have the lowest value of hrs).
   * @return {Vehicle} vehicle object will perform next deliver.
   */
  getNextAvailableVehicle() {
    const sortedVehicles = this.vehicles.sort((a, b) => a.hrs - b.hrs);
    return sortedVehicles[0];
  }

  /**
   * Returns all the delivery record after each vehicle perform deliver.
   * @param {Trip[]} trips an array of planned trips.
   * @return {DeliveryRecord[]} array of DeliveryRecord
   */
  getDeliveryRecords(trips) {
    let result = [];
    trips.forEach((trip) => {
      const vehicle = this.getNextAvailableVehicle();
      const tripDeliveryRecords = vehicle.deliver(trip);
      result = result.concat(tripDeliveryRecords);
    });

    return result;
  }

  /**
   * Estimate packages delivery time used by returns object with package id as key, hrs as value.
   * @param {Package[]} packages an array of packages.
   * @return {Object} package id as key, hrs as value
   */
  estimate(packages) {
    const trips = this.planner.plan(packages);
    const deliveryRecords = this.getDeliveryRecords(trips);

    return deliveryRecords.reduce((prev, curr) => {
      if (!prev[curr.pkgId]) prev[curr.pkgId] = curr.hrs;
      return prev;
    }, {});
  }
}

module.exports = Estimator;
