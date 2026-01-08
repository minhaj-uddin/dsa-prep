const threeSumTriplet = (nums) => {
  nums.sort();
  const triplets = [];

  for (let i = 0; i <= nums.length - 3; i++) {
    if (i == 0 || nums[i] != nums[i - 1]) {
      let left = i + 1;
      let right = nums.length - 1;
      let target = 0 - nums[i];

      while (left < right) {
        if (nums[left] + nums[right] == target) {
          const triplet = [];
          triplet.push(nums[i]);
          triplet.push(nums[left]);
          triplet.push(nums[right]);
          triplets.push(triplet);

          while (left < nums.length - 1 && nums[left] == nums[left + 1]) left++;
          while (right > 0 && nums[right] == nums[right - 1]) right--;

          left++;
          right--;
        } else if (nums[left] + nums[right] < target) {
          left++;
        } else {
          right--;
        }
      }
    }
  }

  return triplets;
};

//const nums = [-1, 0, 1, 2, -1, -4];
const nums = [-2, 2, -1, 0, -2, -1, -1, 0, 2, 0];
const result = threeSumTriplet(nums);
console.log(result);
