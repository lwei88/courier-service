'use strict';
const util = require('util');
const Estimator = require('./cost/Estimator');

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

  const estimator = new Estimator(baseDeliveryCost);
  const cost = estimator.estimate(packages);

  const res = packages.map((x) => {
    return util.format('%s %s %s', x.pkgId, cost[x.pkgId].discount, cost[x.pkgId].totalCost);
  });

  console.log(res.join('\n') + '\n');
}
