const maxAirplanes = (airplanes) => {
  if (!airplanes || !airplanes.length) return 0;

  const starts = airplanes.map((i) => i[0]).sort((a, b) => a - b);
  const ends = airplanes.map((i) => i[1]).sort((a, b) => a - b);

  let p1 = 0;
  let p2 = 0;
  let current = 0;
  let maxPlanes = 0;

  while (p1 < airplanes.length) {
    if (starts[p1] < ends[p2]) {
      current++;
      maxPlanes = Math.max(maxPlanes, current);
      p1++;
    } else {
      current--;
      p2++;
    }
  }

  return maxPlanes;
};

const countOfAirplanes = (airplanes) => {
  const events = [];
  for (const [t, l] of airplanes) {
    events.push([t, +1]);
    events.push([l, -1]);
  }

  // Sort airplanes by arrivals
  events.sort((a, b) => a[0] - b[0]);

  let current = 0;
  let maxPlanes = 0;

  for (const e of events) {
    current += e[1];
    maxPlanes = Math.max(maxPlanes, current);
  }

  return maxPlanes;
};

const airplanes = [
  [1, 10],
  [2, 3],
  [5, 8],
  [4, 7],
];
console.log(maxAirplanes(airplanes));
console.log(countOfAirplanes(airplanes));
