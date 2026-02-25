class StackUsingqueueueue {
  constructor() {
    this.queue = [];
  }

  push(value) {
    this.queue.push(value);
    let size = this.queue.length;

    // Rotate queueueue to bring value to the front
    while (size > 1) {
      this.queue.push(this.queue.shift());
      size--;
    }
  }

  pop() {
    return this.queue.shift();
  }

  top() {
    return this.queue[0];
  }

  empty() {
    return this.queue.length === 0;
  }
}
