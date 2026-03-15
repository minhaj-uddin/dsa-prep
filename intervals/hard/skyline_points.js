const getSkyline = (buildings) => {
  const events = [];

  // Step 1: convert buildings into start and end events
  buildings.forEach(([l, r, h]) => {
    events.push([l, -h]); // start event
    events.push([r, h]); // end event
  });

  // Step 2: sort events
  events.sort((a, b) => {
    // taller starts first, shorter ends later
    if (a[0] !== b[0]) return a[0] - b[0];
    return a[1] - b[1];
  });

  const heap = new MaxHeap();
  const active = new Map();
  const result = [];

  // initialize heap with ground level
  heap.push(0);
  active.set(0, 1);
  let prevMax = 0;

  // Step 4: sweep line
  events.forEach(([x, h]) => {
    if (h < 0) {
      // start of a building
      const height = -h;
      heap.push(height);
      active.set(height, (active.get(height) || 0) + 1);
    } else {
      // end of a building
      active.set(h, active.get(h) - 1);
      if (active.get(h) === 0) active.delete(h);
    }

    // Clean up heap (lazy deletion)
    while (heap.top() && !active.has(heap.top())) {
      heap.pop();
    }

    const currMax = heap.top();
    if (currMax !== prevMax) {
      result.push([x, currMax]);
      prevMax = currMax;
    }
  });

  return result;
};

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  push = (val) => {
    this.heap.push(val);
    this.bubbleUp();
  };

  top = () => (this.heap.length ? this.heap[0] : 0);

  pop = () => {
    if (!this.heap.length) return null;
    const max = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length) {
      this.heap[0] = last;
      this.bubbleDown();
    }
    return max;
  };

  bubbleUp = (idx = this.heap.length - 1) => {
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.heap[parent] >= this.heap[idx]) break;
      [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
      idx = parent;
    }
  };

  bubbleDown = (idx = 0) => {
    const n = this.heap.length;
    while (true) {
      let largest = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;

      if (left < n && this.heap[left] > this.heap[largest]) largest = left;
      if (right < n && this.heap[right] > this.heap[largest]) largest = right;

      if (largest === idx) break;
      [this.heap[idx], this.heap[largest]] = [
        this.heap[largest],
        this.heap[idx],
      ];
      idx = largest;
    }
  };
}

const buildings = [
  [2, 9, 10],
  [3, 7, 15],
  [5, 12, 12],
  [15, 20, 10],
  [19, 24, 8],
];
const result = getSkyline(buildings);
console.log(result);
