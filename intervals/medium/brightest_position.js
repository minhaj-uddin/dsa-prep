const brightestPosition = (lights) => {
  const lightsMap = new Map();

  for (const [position, range] of lights) {
    // Calculate the start and end positions
    const start = position - range;
    const end = position + range + 1;

    // Inc/Decrement brightness at the start & end positions
    lightsMap.set(start, (lightsMap.get(start) ?? 0) + 1);
    lightsMap.set(end, (lightsMap.get(end) ?? 0) - 1);
  }

  const positions = [];
  // Collect all unique positions
  for (const key of lightsMap.keys()) {
    positions.push(key);
  }

  // Sort the positions in ascending order
  positions.sort((a, b) => a - b);

  let resultPos = 0;
  let currentBrightness = 0;
  let maxBrightness = 0;

  // Traverse using sweep line
  for (const position of positions) {
    currentBrightness += lightsMap.get(position);
    if (currentBrightness > maxBrightness) {
      maxBrightness = currentBrightness;
      resultPos = position;
    }
  }

  return resultPos;
};

const lights = [
  [5, 3],
  [7, 2],
];
const result = brightestPosition(lights);
console.log(result);
