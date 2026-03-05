// Approach 1: Priority Queue
class MinHeap {
  constructor(compareFn) {
    this.heap = [];
    this.compare = compareFn;
  }

  size = () => this.heap.length;
  peek = () => this.heap[0];

  push = (value) => {
    this.heap.push(value);
    this._bubbleUp();
  };

  pop = () => {
    if (this.size() === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown();
    return top;
  };

  _bubbleUp = () => {
    let index = this.size() - 1;
    const element = this.heap[index];

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];

      if (this.compare(element, parent) >= 0) break;

      this.heap[index] = parent;
      index = parentIndex;
    }

    this.heap[index] = element;
  };

  _bubbleDown = () => {
    let index = 0;
    const length = this.size();
    const element = this.heap[0];

    while (true) {
      let leftChildIdx = 2 * index + 1;
      let rightChildIdx = 2 * index + 2;
      let swap = null;

      if (leftChildIdx < length) {
        if (this.compare(this.heap[leftChildIdx], element) < 0) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        if (
          (swap === null &&
            this.compare(this.heap[rightChildIdx], element) < 0) ||
          (swap !== null &&
            this.compare(this.heap[rightChildIdx], this.heap[leftChildIdx]) < 0)
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;

      this.heap[index] = this.heap[swap];
      index = swap;
    }

    this.heap[index] = element;
  };
}

const minInterval = (intervals, queries) => {
  // Sort intervals by left
  intervals.sort((a, b) => a[0] - b[0]);

  // Store queries with original index
  const sortedQueries = queries
    .map((q, i) => [q, i])
    .sort((a, b) => a[0] - b[0]);

  const result = new Array(queries.length).fill(-1);

  // Min heap by interval length
  const heap = new MinHeap((a, b) => a[0] - b[0]);

  let i = 0;

  for (const [query, idx] of sortedQueries) {
    // Add valid intervals
    while (i < intervals.length && intervals[i][0] <= query) {
      const [left, right] = intervals[i];
      heap.push([right - left + 1, right]);
      i++;
    }

    // Remove expired intervals
    while (heap.size() && heap.peek()[1] < query) {
      heap.pop();
    }

    // Smallest valid interval
    if (heap.size()) {
      result[idx] = heap.peek()[0];
    }
  }

  return result;
};

// Approach 2: Balanced BST + Sweep Line
const minInterval = (intervals, queries) => {
  class TreapNode {
    constructor(key) {
      this.key = key;
      this.priority = Math.random();
      this.count = 1;
      this.left = null;
      this.right = null;
    }
  }

  class TreeMap {
    constructor() {
      this.root = null;
    }

    rotateRight = (y) => {
      const x = y.left;
      y.left = x.right;
      x.right = y;
      return x;
    };

    rotateLeft = (x) => {
      const y = x.right;
      x.right = y.left;
      y.left = x;
      return y;
    };

    insert = (key) => {
      const insertNode = (node, key) => {
        if (!node) return new TreapNode(key);

        if (key === node.key) {
          node.count++;
        } else if (key < node.key) {
          node.left = insertNode(node.left, key);
          if (node.left.priority < node.priority) {
            node = this.rotateRight(node);
          }
        } else {
          node.right = insertNode(node.right, key);
          if (node.right.priority < node.priority) {
            node = this.rotateLeft(node);
          }
        }
        return node;
      };

      this.root = insertNode(this.root, key);
    };

    delete = (key) => {
      const deleteNode = (node, key) => {
        if (!node) return null;

        if (key < node.key) {
          node.left = deleteNode(node.left, key);
        } else if (key > node.key) {
          node.right = deleteNode(node.right, key);
        } else {
          if (node.count > 1) {
            node.count--;
          } else {
            if (!node.left) return node.right;
            if (!node.right) return node.left;

            if (node.left.priority < node.right.priority) {
              node = this.rotateRight(node);
              node.right = deleteNode(node.right, key);
            } else {
              node = this.rotateLeft(node);
              node.left = deleteNode(node.left, key);
            }
          }
        }
        return node;
      };

      this.root = deleteNode(this.root, key);
    };

    getMin = () => {
      if (!this.root) return null;
      let node = this.root;
      while (node.left) node = node.left;
      return node.key;
    };
  }

  const events = [];

  intervals.forEach(([start, end]) => {
    const size = end - start + 1;
    events.push([start, 0, size]);
    events.push([end, 2, size]);
  });

  queries.forEach((q, index) => {
    events.push([q, 1, index]);
  });

  events.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));

  const tree = new TreeMap();
  const result = new Array(queries.length).fill(-1);

  for (const [pos, type, value] of events) {
    if (type === 0) {
      tree.insert(value);
    } else if (type === 2) {
      tree.delete(value);
    } else {
      const min = tree.getMin();
      if (min !== null) {
        result[value] = min;
      }
    }
  }

  return result;
};

// Approach 3: Binary Search
const minInterval = (intervals, queries) => {
  // Sort intervals by length (smallest first)
  intervals.sort((a, b) => a[1] - a[0] - (b[1] - b[0]));

  // Sort queries with indices
  const sortedQueries = queries
    .map((q, i) => [q, i])
    .sort((a, b) => a[0] - b[0]);

  const result = Array(queries.length).fill(-1);

  const binarySearch = (target) => {
    let low = 0;
    let high = sortedQueries.length;

    while (low < high) {
      const mid = (low + high) >> 1;
      if (sortedQueries[mid][0] < target) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    return low;
  };

  for (const [left, right] of intervals) {
    let idx = binarySearch(left);

    while (idx < sortedQueries.length && sortedQueries[idx][0] <= right) {
      const [, originalIndex] = sortedQueries[idx];
      result[originalIndex] = right - left + 1;
      sortedQueries.splice(idx, 1);
    }

    if (sortedQueries.length === 0) break;
  }

  return result;
};
