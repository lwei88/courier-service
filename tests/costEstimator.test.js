require('jest');

const CostEstimator = require('../src/cost/Estimator');

describe('Estimate cost', () => {
  it('Test Case 1', () => {
    const costEstimator = new CostEstimator(100);
    packages = [
      {
        pkgId: 'PKG1',
        pkgTotalWeight: 5,
        distance: 5,
        offerCode: 'OFR001',
      },
      {
        pkgId: 'PKG2',
        pkgTotalWeight: 15,
        distance: 5,
        offerCode: 'OFR002',
      },
      {
        pkgId: 'PKG3',
        pkgTotalWeight: 10,
        distance: 100,
        offerCode: 'OFR003',
      },
    ];

    const result = costEstimator.estimate(packages);

    expect(result).toMatchObject({
      PKG1: { discount: 0, totalCost: 175 },
      PKG2: { discount: 0, totalCost: 275 },
      PKG3: { discount: 35, totalCost: 665 },
    });
  });

  it('Test Case 2: OFR001, <200 positive case', () => {
    const costEstimator = new CostEstimator(100);
    packages = [
      {
        pkgId: 'PKG1',
        pkgTotalWeight: 70,
        distance: 199,
        offerCode: 'OFR001',
      },
      {
        pkgId: 'PKG2',
        pkgTotalWeight: 100,
        distance: 250,
        offerCode: 'OFR002',
      },
      {
        pkgId: 'PKG3',
        pkgTotalWeight: 10,
        distance: 100,
        offerCode: 'OFR003',
      },
    ];

    const result = costEstimator.estimate(packages);

    expect(result).toMatchObject({
      PKG1: { discount: 180, totalCost: 1616 },
      PKG2: { discount: 0, totalCost: 2350 },
      PKG3: { discount: 35, totalCost: 665 },
    });
  });

  it('Test Case 3: OFR001, 200 distance case, should not get any discount', () => {
    const costEstimator = new CostEstimator(100);
    packages = [
      {
        pkgId: 'PKG1',
        pkgTotalWeight: 70,
        distance: 200,
        offerCode: 'OFR001',
      },
      {
        pkgId: 'PKG2',
        pkgTotalWeight: 100,
        distance: 250,
        offerCode: 'OFR002',
      },
      {
        pkgId: 'PKG3',
        pkgTotalWeight: 10,
        distance: 100,
        offerCode: 'OFR003',
      },
    ];

    const result = costEstimator.estimate(packages);

    expect(result).toMatchObject({
      PKG1: { discount: 0, totalCost: 1800 },
      PKG2: { discount: 0, totalCost: 2350 },
      PKG3: { discount: 35, totalCost: 665 },
    });
  });
});
