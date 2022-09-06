function schedule(trips, packages, noOfVehicles, maxSpeed) {
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
}
