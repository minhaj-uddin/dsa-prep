const maxEvents = (events) => {
  if (!events || !events.length) return 0;
  if (events.length === 1) return 1;

  // Sort events by start, if tie by end date asc
  events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  let i = 0;
  let day = 0;
  let attended = 0;
  const n = events.length;
  const heap = new minHeap();

  while (i < n || !heap.isEmpty()) {
    // If heap empty, jump to next event start
    if (heap.isEmpty()) day = events[i][0];

    // Add all events starting on or before today
    while (i < n && events[i][0] <= day) {
      heap.push(events[i][1]);
      i++;
    }

    // Remove expired events
    while (!heap.isEmpty() && heap.peak() < day) heap.pop();

    // Attend one event daily
    while (!heap.isEmpty()) {
      heap.pop();
      attended++;
      day++;
    }
  }

  return attended;
};

class minHeap {
  constructor(comparator = (a, b) => a < b) {
    this.heap = [];
    this.comparator = comparator;
  }

  size = () => this.heap.length;
  isEmpty = () => this.size() === 0;
  peak = () => this.heap[0];

  _leftChild = (index) => 2 * index + 1;
  _rightChild = (index) => 2 * index + 2;
  _parent = (index) => Math.floor((index - 1) / 2);

  _swap = (i, j) =>
    ([this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]);
  _compare = (i, j) => this.comparator(this.heap[i], this.heap[j]);

  push = (value) => {
    this.heap.push(value);
    this._bubbleUp(this.size - 1);
    return this.size();
  };

  pop = () => {
    if (this.size() === 1) return this.heap.pop();
    const top = this.peak();
    this.heap[0] = this.heap.pop();
    this._bubbleDown(0);
    return top;
  };

  _bubbleUp = (index) => {
    while (index > 0) {
      const parent = this._parent(index);

      if (this._compare(index, parent)) {
        this._swap(index, parent);
      }

      index = parent;
    }
  };

  _bubbleDown = (index) => {
    const n = this.size();

    while (true) {
      const left = this._leftChild(index);
      const right = this._rightChild(index);
      const smallest = index;

      if (left < n && this._compare(left, smallest)) smallest = left;
      if (right < n && this._compare(right, smallest)) smallest = right;

      if (smallest === index) break;

      this._swap(smallest, index);
      index = smallest;
    }
  };
}

const events = [
  [1, 2],
  [2, 3],
  [3, 4],
  [1, 2],
];
const result = maxEvents(events);
console.log(result);
