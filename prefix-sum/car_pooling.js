const carPooling = (trips, capacity) => {
  const stops = Array(10).fill(0);

  for (const [num, from, to] of trips) {
    stops[from] += num;
    stops[to] -= num;
  }

  let current = 0;
  for (let i = 0; i < stops.length; i++) {
    current += stops[i];
    if (current > capacity) {
      return false;
    }
  }

  return true;
};

const capacity = 4;
const trips = [
  [2, 1, 5],
  [3, 3, 7],
];
const result = carPooling(trips, capacity);
console.log(result);
