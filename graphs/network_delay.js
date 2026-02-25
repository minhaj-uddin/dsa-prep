class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this._queue = [];
    this._comparator = comparator;
  }

  size() {
    return this._queue.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  peek() {
    return this._queue[0];
  }

  _parent(idx) {
    return Math.floor((idx - 1) / 2);
  }

  _leftChild(idx) {
    return idx * 2 + 1;
  }

  _rightChild(idx) {
    return idx * 2 + 2;
  }

  _swap(i, j) {
    const temp = this._queue[i];
    this._queue[i] = this._queue[j];
    this._queue[j] = temp;
  }

  _compare(i, j) {
    return this._comparator(this._queue[i], this._queue[j]);
  }

  push(value) {
    this._queue.push(value);
    this._siftUp();
    return this.size();
  }

  _siftUp() {
    let nodeIdx = this.size() - 1;
    while (nodeIdx > 0 && this._compare(nodeIdx, this._parent(nodeIdx))) {
      this._swap(nodeIdx, this._parent(nodeIdx));
      nodeIdx = this._parent(nodeIdx);
    }
  }

  pop() {
    if (this.size() > 1) {
      this._swap(0, this.size() - 1);
    }

    const poppedValue = this._queue.pop();
    this._siftDown();
    return poppedValue;
  }

  _siftDown() {
    let nodeIdx = 0;

    while (
      (this._leftChild(nodeIdx) < this.size() &&
        this._compare(this._leftChild(nodeIdx), nodeIdx)) ||
      (this._rightChild(nodeIdx) < this.size() &&
        this._compare(this._rightChild(nodeIdx), nodeIdx))
    ) {
      const chosenIdx =
        this._rightChild(nodeIdx) < this.size() &&
        this._compare(this._rightChild(nodeIdx), this._leftChild(nodeIdx))
          ? this._rightChild(nodeIdx)
          : this._leftChild(nodeIdx);

      this._swap(chosenIdx, nodeIdx);
      nodeIdx = chosenIdx;
    }
  }
}

const networkDelayTime = (times, N, k) => {
  const distances = new Array(N).fill(Infinity);
  const adjList = distances.map(() => []);
  distances[k - 1] = 0;

  const heap = new PriorityQueue((a, b) => distances[a] < distances[b]);
  heap.push(k - 1);

  for (let i = 0; i < times.length; i++) {
    const source = times[i][0];
    const target = times[i][1];
    const weight = times[i][2];
    adjList[source - 1].push([target - 1, weight]);
  }

  while (!heap.isEmpty()) {
    const currentVertex = heap.pop();
    const adjacent = adjList[currentVertex];

    for (let i = 0; i < adjacent.length; i++) {
      const neighbouringVertex = adjacent[i][0];
      const neighbouringWeight = adjacent[i][1];

      if (
        distances[currentVertex] + neighbouringWeight <
        distances[neighbouringVertex]
      ) {
        distances[neighbouringVertex] =
          distances[currentVertex] + neighbouringWeight;
        heap.push(neighbouringVertex);
      }
    }
  }

  const ans = Math.max(...distances);
  return ans === Infinity ? -1 : ans;
};

const k = 1;
const N = 5;
const times = [
  [1, 2, 9],
  [1, 4, 2],
  [2, 5, 1],
  [4, 2, 4],
  [4, 5, 6],
  [3, 2, 3],
  [5, 3, 7],
  [3, 1, 5],
];

const result = networkDelayTime(times, N, k);
console.log(result);
