class CountIntervals {
  constructor() {
    this.intervals = [];
    this.totalCount = 0;
  }

  binarySearch = (target) => {
    let left = 0;
    let right = this.intervals.length - 1;
    let result = this.intervals.length;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (this.intervals[mid][1] >= target) {
        result = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return result;
  };

  add = (left, right) => {
    // Find first interval >= end
    const idx = this.binarySearch(left);

    while (idx < this.intervals.length && this.intervals[idx][0] <= right) {
      // Destructure l,r for current index
      const [l, r] = this.intervals[idx];

      // Get merge interval
      left = Math.min(l, left);
      right = Math.max(r, right);

      // Update running total
      this.totalCount -= r - l + 1;

      // Add merged interval
      this.intervals.splice(idx, 1);
    }

    // Remove old interval, update count
    this.intervals.splice(idx, 0, [left, right]);
    this.totalCount += right - left + 1;
  };

  count = () => this.totalCount;
}

const obj = new CountIntervals();
obj.add(4, 5);
obj.add(2, 3);
obj.add(6, 9);
obj.add(5, 8);
console.log(obj.count());
