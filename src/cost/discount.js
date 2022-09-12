const Offer = {
  ofr001: {
    discount: 0.1,
    distance: { min: { value: 0 }, max: { value: 200, exclusive: true } },
    weight: { min: { value: 70 }, max: { value: 200 } },
  },
  ofr002: {
    discount: 0.07,
    distance: { min: { value: 50 }, max: { value: 150 } },
    weight: { min: { value: 100 }, max: { value: 250 } },
  },
  ofr003: {
    discount: 0.05,
    distance: { min: { value: 50 }, max: { value: 250 } },
    weight: { min: { value: 10 }, max: { value: 150 } },
  },
};

const discount = (pkg) => {
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
};

module.exports = discount;
