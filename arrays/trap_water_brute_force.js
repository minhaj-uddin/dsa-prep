const getTrappedWater = (heights) => {
  let totalWater = 0;

  for (let p = 0; p < heights.length; p++) {
    let maxLeft = 0;
    let maxRight = 0;
    let leftPointer = p;
    let rightPointer = p;

    while (leftPointer >= 0) {
      maxLeft = Math.max(maxLeft, heights[leftPointer]);
      leftPointer--;
    }

    while (rightPointer < heights.length) {
      maxRight = Math.max(maxRight, heights[rightPointer]);
      rightPointer++;
    }

    const currentWater = Math.min(maxLeft, maxRight) - heights[p];
    if (currentWater >= 0) totalWater += currentWater;
  }

  return totalWater;
};

const heights = [0, 1, 0, 2, 1, 0, 3, 1, 0, 1, 2];
const result = getTrappedWater(heights);
console.log(result);
