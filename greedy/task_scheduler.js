const leastInterval = (tasks, n) => {
  if (n === 0) return tasks.length;
  if (!tasks || tasks.length === 0) return 0;

  const freq = new Array(26).fill(0);

  for (let task of tasks) {
    freq[task.charCodeAt(0) - 65]++;
  }

  const maxFreq = Math.max(...freq);
  const maxCount = freq.filter((f) => f === maxFreq).length;

  const partCount = maxFreq - 1;
  const partLength = n + 1;

  const minIntervals = partCount * partLength + maxCount;

  return Math.max(tasks.length, minIntervals);
};

// Max-Heap implementation
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  size = () => this.heap.length;

  push = (val) => {
    this.heap.push(val);
    this.bubbleUp();
  };

  pop = () => {
    if (this.size() === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return top;
  };

  bubbleUp = () => {
    let index = this.size() - 1;
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[parent] >= this.heap[index]) break;
      [this.heap[parent], this.heap[index]] = [
        this.heap[index],
        this.heap[parent],
      ];
      index = parent;
    }
  };

  bubbleDown = () => {
    let index = 0;
    const length = this.size();

    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let largest = index;

      if (left < length && this.heap[left] > this.heap[largest]) largest = left;
      if (right < length && this.heap[right] > this.heap[largest])
        largest = right;

      if (largest === index) break;

      [this.heap[index], this.heap[largest]] = [
        this.heap[largest],
        this.heap[index],
      ];

      index = largest;
    }
  };
}

// Priority-queue based solution
const leastInterval = (tasks, n) => {
  // Build frequency map
  const freq = new Map();
  tasks.forEach((t) => freq.set(t, (freq.get(t) || 0) + 1));

  // Build max heap
  const maxHeap = new MaxHeap();
  for (const count of freq.values()) {
    maxHeap.push(count);
  }

  let time = 0;

  while (maxHeap.size() > 0) {
    let cycle = n + 1;
    const temp = [];
    let workDone = 0;

    while (cycle > 0 && maxHeap.size() > 0) {
      const current = maxHeap.pop();
      if (current > 1) temp.push(current - 1);
      workDone++;
      cycle--;
    }

    // Reinsert remaining tasks
    temp.forEach((count) => maxHeap.push(count));

    time += maxHeap.size() === 0 ? workDone : n + 1;
  }

  return time;
};

const n = 2;
const tasks = ["A", "B", "A,", "A", "B", "B"];
console.log(leastInterval(tasks, n));
