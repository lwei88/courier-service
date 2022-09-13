const Offer = require('./Offer');

function discount(pkg) {
  const code = pkg.offerCode.toLowerCase();
  if (
    Offer[code] &&
    // Check weight
    pkg.weight >= Offer[code].weight.min.value &&
    (!Offer[code].weight.min.exclusive || pkg.weight > Offer[code].weight.min.value) &&
    pkg.weight <= Offer[code].weight.max.value &&
    (!Offer[code].weight.max.exclusive || pkg.weight < Offer[code].weight.max.value) &&
    // Check distance
    pkg.distance >= Offer[code].distance.min.value &&
    (!Offer[code].distance.min.exclusive || pkg.distance > Offer[code].distance.min.value) &&
    pkg.distance <= Offer[code].distance.max.value &&
    (!Offer[code].distance.max.exclusive || pkg.distance < Offer[code].distance.max.value)
  )
    return Offer[code].discount;

  return 0;
}

module.exports = discount;
