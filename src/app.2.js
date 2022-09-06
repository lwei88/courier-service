'use strict';
const util = require('util');
const CostEstimator = require('./cost/Estimator');
const TimeEstimator = require('./time/Estimator');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}

function main() {
  let [baseDeliveryCost, noOfPackages] = readLine().trim().split(' ');
  baseDeliveryCost = parseInt(baseDeliveryCost);
  noOfPackages = parseInt(noOfPackages);

  let packages = [];
  for (let i = 0; i < noOfPackages; i++) {
    const [pkgId, pkgTotalWeight, distance, offerCode] = readLine().trim().split(' ');
    packages.push({
      pkgId,
      pkgTotalWeight: parseInt(pkgTotalWeight),
      distance: parseInt(distance),
      offerCode,
    });
  }

  let [noOfVehicles, maxSpeed, maxWeight] = readLine()
    .trim()
    .split(' ')
    .map((x) => parseInt(x));

  const costEstimator = new CostEstimator(baseDeliveryCost);
  const timeEstimator = new TimeEstimator(noOfVehicles, maxSpeed, maxWeight);
  const packageCost = costEstimator.estimate(packages);
  const packageTime = timeEstimator.estimate(packages);

  const res = packages.map((x) => {
    return util.format(
      '%s %s %s %s',
      x.pkgId,
      packageCost[x.pkgId].discount,
      packageCost[x.pkgId].totalCost,
      packageTime[x.pkgId]
    );
  });

  console.log(res.join('\n') + '\n');
}
