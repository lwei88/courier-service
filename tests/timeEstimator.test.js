require('jest');

const TimeEstimator = require('../src/time/Estimator');

describe('Estimate time', () => {
  it('Test Case 1', () => {
    const timeEst = new TimeEstimator(2, 70, 200);
    packages = [
      {
        pkgId: 'PKG1',
        pkgTotalWeight: 50,
        distance: 30,
        offerCode: 'OFR001',
      },
      {
        pkgId: 'PKG2',
        pkgTotalWeight: 75,
        distance: 125,
        offerCode: 'OFR008',
      },
      {
        pkgId: 'PKG3',
        pkgTotalWeight: 175,
        distance: 100,
        offerCode: 'OFR003',
      },
      {
        pkgId: 'PKG4',
        pkgTotalWeight: 110,
        distance: 60,
        offerCode: 'OFR002',
      },
      {
        pkgId: 'PKG5',
        pkgTotalWeight: 155,
        distance: 95,
        offerCode: 'NA',
      },
    ];

    const result = timeEst.estimate(packages);

    expect(result).toMatchObject({ PKG1: 3.98, PKG2: 1.78, PKG3: 1.42, PKG4: 0.85, PKG5: 4.19 });
  });
});
