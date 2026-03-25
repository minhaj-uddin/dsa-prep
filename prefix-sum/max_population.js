const maximumPopulation = (logs) => {
  const OFFSET_YEAR = 1950;
  const events = new Array(101).fill(0);

  for (const [birth, death] of logs) {
    events[birth - OFFSET_YEAR] = +1;
    events[death - OFFSET_YEAR] = -1;
  }

  let prefixSum = 0;
  let maxPopulation = 0;
  let populationYear = 0;

  for (let i = 0; i < events.length; i++) {
    prefixSum += events[i];
    if (prefixSum > maxPopulation) {
      maxPopulation = prefixSum;
      populationYear = i;
    }
  }

  return populationYear + OFFSET_YEAR;
};

const logs = [
  [1950, 1960],
  [1951, 1956],
  [1952, 1955],
  [1953, 1980],
  [1954, 1958],
  [1960, 1971],
  [1980, 2000],
];
const result = maximumPopulation(logs);
console.log(result);
