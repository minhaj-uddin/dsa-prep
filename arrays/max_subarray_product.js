const naxSubArrayProduct = (nums) => {
  if (nums.length <= 0) return 0;

  let prevMin = 1;
  let prevMax = 1;

  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i];
    let currentMin = Math.min(
      currentNum,
      currentNum * prevMin,
      currentNum * prevMax
    );
    let currentMax = Math.max(
      currentNum,
      currentNum * prevMin,
      currentNum * prevMax
    );

    prevMin = currentMin;
    prevMax = currentMax;
  }

  return prevMax;
};

const nums = [-1, -2, -3, 0, 3, 5, -1, -2];
const result = naxSubArrayProduct(nums);
console.log(result);
