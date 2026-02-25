const minMeetingRooms = (intervals) => {
  if (!intervals.length) return 0;

  intervals.sort((a, b) => a[0] - b[0]);

  const heap = new MinHeap();
  heap.push(intervals[0][1]);

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];

    if (start >= heap.peek()) {
      heap.pop();
    }

    heap.push(end);
  }

  return heap.size();
};

class MinHeap {
  constructor() {
    this.heap = [];
  }

  size = () => this.heap.length;
  peek = () => this.heap[0];
  push = (val) => {
    this.heap.push(val);
    this.bubbleUp();
  };

  pop = () => {
    if (this.heap.length === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return top;
  };

  bubbleUp = () => {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);
      if (this.heap[parent] <= this.heap[idx]) break;
      [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
      idx = parent;
    }
  };

  bubbleDown = () => {
    let idx = 0;
    const length = this.heap.length;

    while (true) {
      let left = 2 * idx + 1;
      let right = 2 * idx + 2;
      let smallest = idx;

      if (left < length && this.heap[left] < this.heap[smallest])
        smallest = left;

      if (right < length && this.heap[right] < this.heap[smallest])
        smallest = right;

      if (smallest === idx) break;

      [this.heap[idx], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[idx],
      ];

      idx = smallest;
    }
  };
}

const intervals = [
  [0, 30],
  [5, 10],
  [15, 20],
];
const result = minMeetingRooms(intervals);
console.log(result);
