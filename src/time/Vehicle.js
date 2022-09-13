const DeliveryRecord = require('./DeliveryRecord');
const floor = require('../helpers/floor');
const round = require('../helpers/round');

class Vehicle {
  hrs = 0;

  constructor(maxSpeed) {
    this.maxSpeed = maxSpeed;
  }

  /**
   * Returns DeliveryRecords for the packages after deliver,
   * Set the vehicle next trip available hrs.
   *
   * @param {Trip} trip for deliver.
   * @return {DeliveryRecord[]} Array of delivery record depend on packages planned for the trip.
   */
  deliver(trip) {
    const result = trip.packages.map(
      (pkg) => new DeliveryRecord(pkg.id, round(this.hrs + floor(pkg.distance / this.maxSpeed), 2))
    );

    this.hrs = round(this.hrs + floor(trip.maxDistance / this.maxSpeed) * 2, 2);
    return result;
  }
}

module.exports = Vehicle;
