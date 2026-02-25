const threeSum = (nums) => {
  if (!nums.length || nums.length < 3) return [];

  const triplets = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        triplets.push([nums[i], nums[left], nums[right]]);

        while (left < right && nums[left] === nums[left + 1]) continue;
        while (left < right && nums[right] === nums[right - 1]) continue;

        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return triplets;
};

const nums = [-1, 0, 1, 2, -1, -4];
const result = threeSum(nums);
console.log(result);
