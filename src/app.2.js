'use strict';
const util = require('util');
const CostEstimator = require('./cost/Estimator');
const TimeEstimator = require('./time/Estimator');
const Package = require('./shared/Package');

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
    const [id, weight, distance, offerCode] = readLine().trim().split(' ');
    packages.push(new Package(id, weight, distance, offerCode));
  }

  let [noOfVehicles, maxSpeed, maxWeight] = readLine()
    .trim()
    .split(' ')
    .map((x) => parseInt(x));

  const costEstimator = new CostEstimator(baseDeliveryCost);
  const timeEstimator = new TimeEstimator(noOfVehicles, maxSpeed, maxWeight);
  const packageCost = costEstimator.estimate(packages);
  const packageTime = timeEstimator.estimate(packages);

  const res = packages.map((pkg) => {
    return util.format(
      '%s %s %s %s',
      pkg.id,
      packageCost[pkg.id].discount,
      packageCost[pkg.id].totalCost,
      packageTime[pkg.id]
    );
  });

  console.log(res.join('\n') + '\n');
}
