class RangeQuerySum {
  constructor(nums) {
    this.n = nums.length;
    this.nums = [...nums];
    this.tree = new Array(this.n + 1).fill(0);

    for (let i = 0; i < this.n; i++) {
      this.build(i, nums[i]);
    }
  }

  build = (index, value) => {
    index += 1;
    while (index <= this.n) {
      this.tree[index] += value;
      index += index & -index;
    }
  };

  update = (index, value) => {
    const delta = value - this.nums[index];
    this.tree[index] = value;
    this.build(index, delta);
  };

  query = (index) => {
    let sum = 0;
    while (index > 0) {
      sum += this.tree[index];
      index -= index & -index;
    }
    return sum;
  };

  sumRange = (left, right) => {
    return this.query(right) - this.query(left - 1);
  };
}

const nums = [1, 3, 5, 8, 4, 6];
const rqs = new RangeQuerySum(nums);
console.log(rqs.sumRange(1, 6));
rqs.update(2, 3); // Point Update
console.log(rqs.sumRange(1, 6));
