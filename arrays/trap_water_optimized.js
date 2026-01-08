const getTrappedWater = (heights) => {
  let totalWater = 0;
  let maxLeft = 0;
  let maxRight = 0;

  let left = 0;
  let right = heights.length - 1;

  while (left < right) {
    if (heights[left] < heights[right]) {
      if (heights[left] >= maxLeft) {
        maxLeft = heights[left];
      } else {
        totalWater += maxLeft - heights[left];
      }
      left++;
    } else {
      if (heights[right] >= maxRight) {
        maxRight = heights[right];
      } else {
        totalWater += maxRight - heights[right];
      }
      right--;
    }
  }

  return totalWater;
};

const heights = [0, 1, 0, 2, 1, 0, 3, 1, 0, 1, 2];
const result = getTrappedWater(heights);
console.log(result);
