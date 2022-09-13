require('jest');

const CostEstimator = require('../src/cost/Estimator');
const Package = require('../src/shared/Package');

describe('Estimate cost', () => {
  it('Test Case 1', () => {
    const costEstimator = new CostEstimator(100);
    packages = [
      new Package('PKG1', 5, 5, 'OFR001'),
      new Package('PKG2', 15, 5, 'OFR002'),
      new Package('PKG3', 10, 100, 'OFR003'),
    ];

    const result = costEstimator.estimate(packages);

    expect(result).toMatchObject({
      PKG1: { discount: 0, totalCost: 175 },
      PKG2: { discount: 0, totalCost: 275 },
      PKG3: { discount: 35, totalCost: 665 },
    });
  });

  it('Test Case 2 (test edge case): OFR001, Pkg1 with <200 distance case', () => {
    const costEstimator = new CostEstimator(100);
    packages = [
      new Package('PKG1', 70, 199, 'OFR001'),
      new Package('PKG2', 100, 250, 'OFR002'),
      new Package('PKG3', 10, 100, 'OFR003'),
    ];

    const result = costEstimator.estimate(packages);

    expect(result).toMatchObject({
      PKG1: { discount: 180, totalCost: 1616 },
      PKG2: { discount: 0, totalCost: 2350 },
      PKG3: { discount: 35, totalCost: 665 },
    });
  });

  it('Test Case 3 (test minmax value exclusive): OFR001, Pkg1 200 distance case, should not get any discount', () => {
    const costEstimator = new CostEstimator(100);
    packages = [
      new Package('PKG1', 70, 200, 'OFR001'),
      new Package('PKG2', 100, 250, 'OFR002'),
      new Package('PKG3', 10, 100, 'OFR003'),
    ];

    const result = costEstimator.estimate(packages);

    expect(result).toMatchObject({
      PKG1: { discount: 0, totalCost: 1800 },
      PKG2: { discount: 0, totalCost: 2350 },
      PKG3: { discount: 35, totalCost: 665 },
    });
  });
});
