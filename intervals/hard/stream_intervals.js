// Fixed-size Array
class SummaryRanges {
  constructor() {
    this.seen = new Array(10).fill(false);
  }

  addNum = (value) => {
    this.seen[value] = true;
  };

  getIntervals = () => {
    const result = [];

    for (let i = 0; i < this.seen.length; i++) {
      if (this.seen[i]) {
        let start = i;
        while (this.seen[i + 1]) i++;
        result.push([start, i]);
      }
    }

    return result;
  };
}

// Binary Search
class SummaryRanges {
  constructor() {
    this.intervals = [];
  }

  binarySearch = (target) => {
    let left = 0;
    let right = this.intervals.length;

    while (left < right) {
      const mid = (left + right) >> 1;
      if (this.intervals[mid][0] < target) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left;
  };

  addNum = (value) => {
    const intervals = this.intervals;
    let i = this.binarySearch(value);

    let start = value;
    let end = value;

    // Merge with left neighbour
    if (i > 0 && intervals[i - 1][1] >= value) return;
    if (i > 0 && intervals[i - 1][1] + 1 === value) {
      start = intervals[i - 1][0];
      intervals.splice(--i, 1);
    }

    // Merge with right neighbour
    if (i < intervals.length && intervals[i][0] - 1 === value) {
      end = intervals[i][1];
      intervals.splice(i, 1);
    }

    intervals.splice(i, 0, [start, end]);
  };

  getIntervals = () => this.intervals;
}

// Singla pass - 3 pointers
class SummaryRanges {
  constructor() {
    this.intervals = [];
  }

  addNum = (val) => {
    let i = 0;
    const result = [];
    const N = this.intervals.length;

    // Phase 1: intervals completely before val
    while (i < N && this.intervals[i][1] + 1 < val) {
      result.push(this.intervals[i++]);
    }

    let start = val;
    let end = val;

    // Phase 2: merge overlapping / touching intervals
    while (i < N && this.intervals[i][0] - 1 <= end) {
      start = Math.min(start, this.intervals[i][0]);
      end = Math.max(end, this.intervals[i][1]);
      i++;
    }

    result.push([start, end]);

    // Phase 3: remaining intervals
    while (i < N) {
      result.push(this.intervals[i++]);
    }

    this.intervals = result;
  };

  getIntervals = () => this.intervals;
}
