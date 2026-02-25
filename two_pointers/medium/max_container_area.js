const maxArea = (height) => {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;

  while (left < right) {
    const width = right - left;
    const minHeight = Math.min(height[left], height[right]);
    const area = width * minHeight;

    maxArea = Math.max(maxArea, area);

    // Move the pointer at the shorter line
    height[left] <= height[right] ? left++ : right--;
  }

  return maxArea;
};

const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
const result = maxArea(height);
console.log(result);
