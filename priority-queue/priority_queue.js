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

let input = [50, 40, 25, 20, 35, 10, 15];
const queue = new PriorityQueue();

for (let i = 0; i < input.length; i++) {
  queue.push(input[i]);
}

queue.push(66);
queue.push(11);
console.log(queue);

queue.pop();
console.log(queue);
