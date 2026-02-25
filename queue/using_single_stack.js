class QueueUsingOneStack {
  constructor() {
    this.stack = [];
    this.front = undefined;
  }

  enqueue(value) {
    if (this.stack.length === 0) {
      this.front = value;
    }
    this.stack.push(value);
  }

  dequeue() {
    if (this.stack.length === 0) return undefined;

    if (this.stack.length === 1) {
      const value = this.stack.pop();
      this.front = undefined;
      return value;
    }

    const top = this.stack.pop();
    const res = this.dequeue();
    this.stack.push(top);

    return res;
  }

  peek() {
    return this.front;
  }

  empty() {
    return this.stack.length === 0;
  }
}
