const calculateWaitTime = (jobs) => {
  if (!jobs || jobs.length === 1) return 0;

  jobs.sort((a, b) => a.arrival - b.arrival);
  const heap = new MinHeap((a, b) => a.burst - b.burst);

  const n = jobs.length;
  let currentTime = 0;
  let totalWaiting = 0;
  let i = 0;

  while (i < n || heap.size()) {
    while (i < n && jobs[i].arrival <= currentTime) {
      heap.push(jobs[i]);
      i++;
    }

    if (heap.size()) {
      const { arrival, burst } = heap.pop();
      totalWaiting += currentTime - arrival;
      currentTime += burst;
    } else {
      currentTime = jobs[i].arrival;
    }
  }

  return Math.floor(totalWaiting / n);
};

class MinHeap {
  constructor(compareFn = (a, b) => a - b) {
    this.heap = [];
    this.compare = compareFn;
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0] ?? null;
  }

  push(value) {
    this.heap.push(value);
    this._heapifyUp();
  }

  pop() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._heapifyDown();
    return min;
  }

  _heapifyUp() {
    let index = this.size() - 1;

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (this.compare(this.heap[index], this.heap[parentIndex]) < 0) {
        this._swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  _heapifyDown() {
    let index = 0;
    const length = this.size();

    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (
        left < length &&
        this.compare(this.heap[left], this.heap[smallest]) < 0
      ) {
        smallest = left;
      }

      if (
        right < length &&
        this.compare(this.heap[right], this.heap[smallest]) < 0
      ) {
        smallest = right;
      }

      if (smallest !== index) {
        this._swap(index, smallest);
        index = smallest;
      } else {
        break;
      }
    }
  }

  _swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}
