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

module.exports = Offer;
