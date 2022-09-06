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

const discount = (weight, distance, offerCode) => {
  const code = offerCode.toLowerCase();
  if (
    Offer[code] &&
    // Check weight
    weight >= Offer[code].weight.min.value &&
    (!Offer[code].weight.min.exclusive || weight > Offer[code].weight.min.value) &&
    weight <= Offer[code].weight.max.value &&
    (!Offer[code].weight.max.exclusive || weight < Offer[code].weight.max.value) &&
    // Check distance
    distance >= Offer[code].distance.min.value &&
    (!Offer[code].distance.min.exclusive || distance > Offer[code].distance.min.value) &&
    distance <= Offer[code].distance.max.value &&
    (!Offer[code].distance.max.exclusive || distance < Offer[code].distance.max.value)
  )
    return Offer[code].discount;

  return 0;
};

module.exports = discount;