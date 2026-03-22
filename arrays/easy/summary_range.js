const summaryRanges = (nums) => {
  if (!nums || !nums.length) return [];
  if (nums.length === 1) return [nums[0]];

  const result = [];
  for (let i = 0; i < nums.length; i++) {
    const start = nums[i];

    // Move the pointer until the next number is not consecutive
    while (i + 1 < nums.length && nums[i + 1] === nums[i] + 1) i++;

    const end = nums[i];

    if (start === end) {
      result.push(`${start}`);
    } else {
      result.push(`${start}->${end}`);
    }
  }

  return result;
};

const nums = [0, 1, 2, 4, 5, 7];
const result = summaryRanges(nums);
console.log(result);
