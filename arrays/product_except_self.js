const productExceptSelf = (nums) => {
  let prefixProduct = new Array(nums.length);
  prefixProduct[0] = 1;
  console.log(prefixProduct);
  for (let i = 1; i < nums.length; i++) {
    console.log(prefixProduct[i - 1], nums[i - 1]);
    prefixProduct[i] = prefixProduct[i - 1] * nums[i - 1];
  }

  let suffixProduct = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    //console.log(prefixProduct[i], suffixProduct);
    prefixProduct[i] = prefixProduct[i] * suffixProduct;
    suffixProduct = suffixProduct * nums[i];
  }

  return prefixProduct;
};

const nums = [1, 2, 3, 4];
//const nums = [-1, 1, 0, -3, 3];
const result = productExceptSelf(nums);
console.log(result);
