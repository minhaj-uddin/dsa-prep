class MaxHeap {
  constructor(comparator = (a, b) => a > b) {
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

const queue = new MaxHeap();
let input = [50, 40, 25, 20, 35, 10, 15];

for (let i = 0; i < input.length; i++) {
  queue.push(input[i]);
}

console.log(queue.push(22));
console.log(queue.push(11));
console.log(queue.push(33));
console.log(queue.push(65));
console.log(queue._heap);
console.log(queue.pop());
console.log(queue._heap);
