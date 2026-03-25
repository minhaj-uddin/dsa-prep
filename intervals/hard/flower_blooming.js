// Approach 1: Binary Search + Sorting
const fullBloomFlowers = (flowers, people) => {
  // Step 1: Separate starts and ends
  const starts = flowers.map((f) => f[0]).sort((a, b) => a - b);
  const ends = flowers.map((f) => f[1]).sort((a, b) => a - b);

  // Binary search: first index > target
  const upperBound = (arr, target) => {
    let left = 0;
    let right = arr.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] <= target) left = mid + 1;
      else right = mid;
    }
    return left;
  };

  // Binary search: first index >= target
  const lowerBound = (arr, target) => {
    let left = 0;
    let right = arr.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] < target) left = mid + 1;
      else right = mid;
    }
    return left;
  };

  const answer = [];
  for (const p of people) {
    const s = upperBound(starts, p);
    const e = lowerBound(ends, p);
    answer.push(s - e);
  }

  return answer;
};

// Approach 2: Line Sweep + Events
const fullBloomFlowers = (flowers, people) => {
  const events = [];
  for (let [start, end] of flowers) {
    events.push([start, 1]);
    events.push([end + 1, -1]);
  }

  events.sort((a, b) => a[0] - b[0]);
  const sortedPeople = people.map((p, i) => [p, i]).sort((a, b) => a[0] - b[0]);
  const result = new Array(people.length).fill(0);

  let p = 0;
  let count = 0;
  for (const [time, index] of sortedPeople) {
    while (p < events.length && events[p][0] <= time) {
      count += events[p][1];
      p++;
    }
    result[index] = count;
  }

  return result;
};

// Approach 3: Two Pointer Technique
const fullBloomFlowers = (flowers, people) => {
  const start = [];
  const end = [];

  for (let f of flowers) {
    start.push(f[0]);
    end.push(f[1]);
  }

  start.sort((a, b) => a - b);
  end.sort((a, b) => a - b);

  let p1 = 0;
  let p2 = 0;
  let count = 0;

  const peopleIndex = people
    .map((p, idx) => [p, idx])
    .sort((a, b) => a[0] - b[0]);

  const result = new Array(people.length);

  for (let [time, index] of peopleIndex) {
    while (p1 < start.length && start[p1] <= time) {
      count++;
      p1++;
    }
    while (p2 < end.length && end[p2] < time) {
      count--;
      p2++;
    }
    result[index] = count;
  }

  return result;
};

// Approach 4: MinHeap (Priority Queue)
const fullBloomFlowers = (flowers, people) => {
  // Sort flowers by start time
  flowers.sort((a, b) => a[0] - b[0]);

  // Sorted people by indices, into new structure
  const sortedPeople = people.map((p, i) => [p, i]).sort((a, b) => a[0] - b[0]);

  // Use MinHeap for flower end times
  const heap = new MinHeap();

  let result = new Array(people.length);

  let p = 0;
  for (let [time, index] of sortedPeople) {
    // Add all flowers that started
    while (p < flowers.length && flowers[p][0] <= time) {
      heap.push(flowers[p][1]);
      p++;
    }

    // Remove flowers that already ended
    while (!heap.isEmpty() && heap.peek() < time) heap.pop();

    result[index] = heap.size();
  }

  return result;
};

class MinHeap {
  constructor(comparator = (a, b) => a < b) {
    this._heap = [];
    this._comparator = comparator;
  }

  size = () => this._heap.length;
  isEmpty = () => this.size() === 0;
  peek = () => this._heap[0];

  _leftChild = (index) => index * 2 + 1;
  _rightChild = (index) => index * 2 + 2;
  _parent = (index) => Math.floor((index - 1) / 2);

  _swap = (i, j) =>
    ([this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]]);
  _compare = (i, j) => this._comparator(this._heap[i], this._heap[j]);

  push = (value) => {
    this._heap.push(value);
    this._bubbleUp(this.size() - 1);
    return this.size();
  };

  pop = () => {
    if (this.size() === 1) return this._heap.pop();

    const top = this.peek();
    this._heap[0] = this._heap.pop();
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
      let largest = index;

      if (left < n && this._compare(left, largest)) largest = left;
      if (right < n && this._compare(right, largest)) largest = right;

      if (largest === index) break;

      this._swap(index, largest);
      index = largest;
    }
  };
}

const flowers = [
  [1, 6],
  [3, 7],
  [9, 12],
  [4, 13],
];
const people = [2, 3, 7, 11];
const result = fullBloomFlowers(flowers, people);
console.log(result);
