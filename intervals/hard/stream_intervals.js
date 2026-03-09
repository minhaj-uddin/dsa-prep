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

// Disjoint Set Union
class DSU {
  constructor() {
    this.parent = new Map();
    this.rank = new Map();
    this.intervals = new Map();
  }

  exists(x) {
    return this.parent.has(x);
  }

  makeSet(x) {
    this.parent.set(x, x);
    this.rank.set(x, 0);
    this.intervals.set(x, [x, x]);
  }

  find(x) {
    if (!this.exists(x)) return null;

    if (this.parent.get(x) !== x) {
      this.parent.set(x, this.find(this.parent.get(x)));
    }

    return this.parent.get(x);
  }

  union(x, y) {
    let xr = this.find(x);
    let yr = this.find(y);

    if (xr === null || yr === null || xr === yr) return;

    // Union by Rank
    if (this.rank.get(xr) < this.rank.get(yr)) {
      [xr, yr] = [yr, xr];
    }

    this.parent.set(yr, xr);

    if (this.rank.get(xr) === this.rank.get(yr)) {
      this.rank.set(xr, this.rank.get(xr) + 1);
    }

    // Merge Intervals
    const intervalX = this.intervals.get(xr);
    const intervalY = this.intervals.get(yr);

    this.intervals.set(xr, [
      Math.min(intervalX[0], intervalY[0]),
      Math.max(intervalX[1], intervalY[1]),
    ]);

    this.intervals.delete(yr);
  }
}

class SummaryRanges {
  constructor() {
    this.dsu = new DSU();
  }

  addNum(val) {
    if (this.dsu.exists(val)) return;

    this.dsu.makeSet(val);

    this.dsu.union(val, val - 1);
    this.dsu.union(val, val + 1);
  }

  getIntervals() {
    return Array.from(this.dsu.intervals.values()).sort((a, b) => a[0] - b[0]);
  }
}
