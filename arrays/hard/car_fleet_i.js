const carFleet = (target, position, speed) => {
  if (!position || !position.length) return 0;
  if (position.length === 1) return 1;

  // Step 1: Build array of [position, time_to_target]
  const cars = position.map((pos, i) => [pos, (target - pos) / speed[i]]);

  // Step 2: Sort by position descending
  cars.sort((a, b) => b[0] - a[0]);

  let fleetCount = 0;
  let lastFleetTime = 0;

  // Step 3: Traverse fleet
  for (const [_, time] of cars) {
    if (time > lastFleetTime) {
      fleetCount++;
      lastFleetTime = time;
    }
  }

  return fleetCount;
};

const target = 12;
const position = [10, 8, 0, 5, 3];
const speed = [2, 4, 1, 1, 3];

const result = carFleet(target, position, speed);
console.log(result);
