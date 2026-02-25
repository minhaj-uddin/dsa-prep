class StackUsingQueues {
  constructor() {
    this.queueIn = [];
    this.queueOut = [];
  }

  push(value) {
    this.queueOut.push(value);

    while (this.queueIn.length > 0) {
      this.queueOut.push(this.queueIn.shift());
    }

    [this.queueIn, this.queueOut] = [this.queueOut, this.queueIn];
  }

  pop() {
    return this.queueIn.shift();
  }

  top() {
    return this.queueIn[0];
  }

  empty() {
    return this.queueIn.length === 0;
  }
}
