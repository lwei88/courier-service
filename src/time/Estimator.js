function getCombinations(arr) {
  if (arr.length === 1) return [arr];
  else {
    const com = getCombinations(arr.slice(1));
    return com.concat(
      com.map((e) => e.concat(arr[0])),
      [[arr[0]]]
    );
  }
}

const groupPackageByMaxWeight = (maxWeight, packages) => {
  const packageIds = packages.map((x) => x.pkgId);
  const allPackageCombinations = getCombinations(packageIds).reverse(); // Get combinations recursive function, will return the last element first. so use the reverse function to sort the combinations according to the input sequence.

  let packageCombsWeight = allPackageCombinations
    .map((pckComb) => {
      const thisShipmentPackages = packages.reduce((prev, curr) => {
        if (pckComb.includes(curr.pkgId)) prev.push(curr);
        return prev;
      }, []);

      const weight = thisShipmentPackages.reduce((prev, curr) => {
        return prev + curr.pkgTotalWeight;
      }, 0);

      const minDistance = Math.min(...thisShipmentPackages.map((p) => p.distance));

      return { id: pckComb.join('-'), pckComb, weight, minDistance };
    })
    .filter((x) => x.weight <= maxWeight)
    .sort((a, b) => a.minDistance - b.minDistance)
    .sort((a, b) => b.weight - a.weight)
    .sort((a, b) => b.pckComb.length - a.pckComb.length);

  const packageGroup = [];
  while (packageCombsWeight.length > 0) {
    packageGroup.push(packageCombsWeight[0]);

    const filterPkgIds = packageCombsWeight[0].pckComb;
    filterPkgIds.forEach((pkgId) => {
      packageCombsWeight = packageCombsWeight.filter((x) => !x.pckComb.includes(pkgId));
    });
  }

  return packageGroup;
};

const schedule = (trips, packages, noOfVehicles, maxSpeed) => {
  const schedule = trips.reduce(
    (prev, curr) => {
      const allVehicles = JSON.parse(JSON.stringify(prev.slice(-1)[0]));
      const minHr = Math.min(...allVehicles.map((v) => v.hr));

      const pckCombOneWayHr = curr.pckComb.map((id) => {
        return {
          pkgId: id,
          oneWayHr: Math.floor((packages.find((p) => p.pkgId == id).distance / maxSpeed) * 100) / 100,
        };
      });

      const maxReturnTripsHrs = Math.max(...pckCombOneWayHr.map((p) => p.oneWayHr * 2));
      const pckCombDeliveryHr = pckCombOneWayHr.map((p) => {
        return { pkgId: p.pkgId, deliveryHr: parseFloat((p.oneWayHr + minHr).toFixed(2)) };
      });

      const affectedVehicle = allVehicles[allVehicles.map((v) => v.hr).indexOf(minHr)];
      affectedVehicle.hr = minHr + maxReturnTripsHrs;
      affectedVehicle.id = curr.id;
      affectedVehicle.pckCombDeliveryHr = pckCombDeliveryHr;

      prev.push(allVehicles);
      return prev;
    },
    [new Array(noOfVehicles).fill({ id: null, hr: 0, pckCombDeliveryHr: [] })]
  );

  return schedule;
};

class Estimator {
  constructor(noOfVehicles, maxSpeed, maxWeight) {
    this.noOfVehicles = noOfVehicles;
    this.maxSpeed = maxSpeed;
    this.maxWeight = maxWeight;
  }

  estimate(packages) {
    let trips = groupPackageByMaxWeight(this.maxWeight, packages);
    const sched = schedule(trips, packages, this.noOfVehicles, this.maxSpeed);

    const packageTime = sched
      .reduce((prev, curr) => {
        return prev.concat(curr.map((v) => v.pckCombDeliveryHr));
      }, [])
      .reduce((prev, curr) => {
        return prev.concat(curr);
      }, [])
      .reduce((prev, curr) => {
        if (!prev[curr.pkgId]) prev[curr.pkgId] = curr.deliveryHr;
        return prev;
      }, {});

    return packageTime;
  }
}

module.exports = Estimator;
