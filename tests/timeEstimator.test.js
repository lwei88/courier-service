require('jest');

const TimeEstimator = require('../src/time/Estimator');
const Package = require('../src/shared/Package');

describe('Estimate time', () => {
  /*
  100 5
  PKG1 50 30 OFR001
  PKG2 75 125 OFR008
  PKG3 175 100 OFR003
  PKG4 110 60 OFR002
  PKG5 155 95 NA
  2 70 200
  */
  it('Test Case 1', () => {
    const timeEst = new TimeEstimator(2, 70, 200);
    packages = [
      new Package('PKG1', 50, 30, 'OFR001'),
      new Package('PKG2', 75, 125, 'OFR002'),
      new Package('PKG3', 175, 100, 'OFR003'),
      new Package('PKG4', 110, 60, 'OFR002'),
      new Package('PKG5', 155, 95, 'NA'),
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
      new Package('P1', 50, 100, 'OFR002'),
      new Package('P2', 50, 100, 'OFR001'),
      new Package('P3', 150, 100, 'OFR003'),
      new Package('P4', 99, 100, 'OFR001'),
      new Package('P5', 100, 100, 'OFR001'),
    ];

    const result = timeEst.estimate(packages);

    expect(result).toMatchObject({ P1: 1.42, P2: 1.42, P3: 4.26, P4: 7.1, P5: 1.42 });
  });

  /*
  100 4
  P1 30 100 OFR002
  P2 50 100 OFR001
  P3 150 100 OFR003
  P4 130 100 OFR001
  1 70 200
  */
  it('Test Case 3: Delivery criteria - contain max packages, heavier packages', () => {
    const timeEst = new TimeEstimator(1, 70, 200);
    packages = [
      new Package('P1', 30, 100, 'OFR002'),
      new Package('P2', 50, 100, 'OFR001'),
      new Package('P3', 150, 100, 'OFR003'),
      new Package('P4', 130, 100, 'OFR001'),
    ];

    const result = timeEst.estimate(packages);

    expect(result).toMatchObject({ P1: 4.26, P2: 1.42, P3: 1.42, P4: 4.26 });
  });

  /*
100 4
P1 50 100 OFR002
P2 50 100 OFR001
P3 150 100 OFR003
P4 150 90 OFR001
1 70 200
  */
  it('Test Case 4: Delivery criteria - contain max packages, heavier packages, minimum distance', () => {
    const timeEst = new TimeEstimator(1, 70, 200);
    packages = [
      new Package('P1', 50, 100, 'OFR002'),
      new Package('P2', 50, 100, 'OFR001'),
      new Package('P3', 150, 100, 'OFR003'),
      new Package('P4', 150, 90, 'OFR001'),
    ];

    const result = timeEst.estimate(packages);

    expect(result).toMatchObject({ P1: 1.42, P2: 4.26, P3: 4.26, P4: 1.28 });
  });

  /*
100 4
P1 50 100 OFR002
P2 50 100 OFR001
P3 150 100 OFR003
P4 150 90 OFR001
1 70 150
  */
  it('Test Case 5: Vehicle - max weight', () => {
    const timeEst = new TimeEstimator(1, 70, 150);
    packages = [
      new Package('P1', 50, 100, 'OFR002'),
      new Package('P2', 50, 100, 'OFR001'),
      new Package('P3', 150, 100, 'OFR003'),
      new Package('P4', 150, 90, 'OFR001'),
    ];

    const result = timeEst.estimate(packages);

    expect(result).toMatchObject({ P1: 1.42, P2: 1.42, P3: 6.82, P4: 4.12 });
  });

  /*
100 4
P1 50 100 OFR002
P2 50 100 OFR001
P3 150 100 OFR003
P4 150 90 OFR001
1 100 150
  */
  it('Test Case 6: Vehicle - max speed', () => {
    const timeEst = new TimeEstimator(1, 100, 150);
    packages = [
      new Package('P1', 50, 100, 'OFR002'),
      new Package('P2', 50, 100, 'OFR001'),
      new Package('P3', 150, 100, 'OFR003'),
      new Package('P4', 150, 90, 'OFR001'),
    ];

    const result = timeEst.estimate(packages);

    expect(result).toMatchObject({ P1: 1, P2: 1, P3: 4.8, P4: 2.9 });
  });
});
