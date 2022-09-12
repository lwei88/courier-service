'use strict';
const util = require('util');
const Estimator = require('./cost/Estimator');
const Package = require('./entities/Package');

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

  const estimator = new Estimator(baseDeliveryCost);
  const cost = estimator.estimate(packages);

  const res = packages.map((pkg) => {
    return util.format('%s %s %s', pkg.id, cost[pkg.id].discount, cost[pkg.id].totalCost);
  });

  console.log(res.join('\n') + '\n');
}
