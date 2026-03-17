// Sweep Line/Sorted Map
class MyCalendar {
  constructor() {
    this.deltaMap = new Map();
  }

  _get = (key) => this.deltaMap.get(key) || 0;
  _set = (key, value) => this.deltaMap.set(key, this._get(key) + value);
  _sort = () => [...this.deltaMap.keys()].sort((a, b) => a - b);

  book = (startTime, endTime) => {
    this._set(startTime, 1);
    this._set(endTime, -1);

    // Sort keys ascending order
    const sortedKeys = this._sort();

    let maxBookings = 0;
    let currentSum = 0;

    for (const key of sortedKeys) {
      currentSum += this._get(key);
      if (currentSum > maxBookings) maxBookings = currentSum;
    }

    return maxBookings;
  };
}

// Dynamic Segment Tree
class TreeNode {
  constructor() {
    this.left = null;
    this.right = null;
    this.lazy = 0;
    this.max = 0;
  }
}

class CalendarTree {
  constructor() {
    this.root = new TreeNode();
    this.START = 0;
    this.END = 1e9;
  }

  update = (node, start, end, l, r, value) => {
    // No overlap
    if (start > r || end < l) return;

    // Complete overlap
    if (l <= start && end <= r) {
      node.lazy += value;
      node.max += value;
      return;
    }

    this.pushDown(node);

    // Partial overlap
    const mid = Math.floor((start + end) / 2);

    this.update(node.left, start, mid, l, r, value);
    this.update(node.right, mid + 1, end, l, r, value);

    node.max = Math.max(node.left.max, node.right.max);
  };

  pushDown = (node) => {
    if (!node.left) node.left = new TreeNode();
    if (!node.right) node.right = new TreeNode();

    if (node.lazy !== 0) {
      // propagate to left child
      node.left.max += node.lazy;
      node.left.lazy += node.lazy;

      // propagate to right child
      node.right.max += node.lazy;
      node.right.lazy += node.lazy;

      // clear current node's lazy
      node.lazy = 0;
    }
  };

  book = (start, end) => {
    this.update(this.root, this.START, this.END, start, end - 1, 1);
    return this.root.max;
  };
}

var obj = new CalendarTree();
console.log(obj.book(10, 20));
console.log(obj.book(50, 60));
console.log(obj.book(10, 40));
console.log(obj.book(5, 15));
console.log(obj.book(5, 10));
console.log(obj.book(25, 55));
