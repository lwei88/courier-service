require('jest');

const TimeEstimator = require('../src/time/Estimator');

describe('Estimate time', () => {
  /*
  100 5
  PKG1 50 30 OFR001
  PKG2 75 125 OFR008
  PKG3 175 100 OFR003
  PKG4 110 60 OFR002
  PKG5 155 95 NA
  2 70 20
  */
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

  /*
  100 5
  P1 50 100 OFR002
  P2 50 100 OFR001
  P3 150 100 OFR003
  P4 99 100 OFR001
  P5 100 100 OFR001
  1 70 200
  */
  it('Test Case 2: Delivery criteria - contain max packages', () => {
    const timeEst = new TimeEstimator(1, 70, 200);
    packages = [
      {
        pkgId: 'P1',
        pkgTotalWeight: 50,
        distance: 100,
        offerCode: 'OFR002',
      },
      {
        pkgId: 'P2',
        pkgTotalWeight: 50,
        distance: 100,
        offerCode: 'OFR001',
      },
      {
        pkgId: 'P3',
        pkgTotalWeight: 150,
        distance: 100,
        offerCode: 'OFR003',
      },
      {
        pkgId: 'P4',
        pkgTotalWeight: 99,
        distance: 100,
        offerCode: 'OFR001',
      },
      {
        pkgId: 'P5',
        pkgTotalWeight: 100,
        distance: 100,
        offerCode: 'OFR001',
      },
    ];

    const result = timeEst.estimate(packages);

    expect(result).toMatchObject({ P1: 1.42, P2: 1.42, P3: 4.26, P4: 7.1, P5: 1.42 });
  });
});
