class Package {
  constructor(id, weight, distance, offerCode) {
    this.id = id;
    this.weight = Number(weight);
    this.distance = Number(distance);
    this.offerCode = offerCode;
  }
}

module.exports = Package;
