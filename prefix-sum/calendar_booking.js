class MyCalendar {
  constructor() {
    this.deltaMap = new Map();
  }

  _get = (key) => this.deltaMap.get(key) || 0;
  _set = (key, value) => this.deltaMap.set(key, this._get(key) + value);
  _sort = () => [...this.deltaMap.keys()].sort((a, b) => a - b);

  book(startTime, endTime) {
    this._set(startTime, 1);
    this._set(endTime, -1);

    // Sort keys ascending order
    const sortedKeys = this._sort();

    let maxBookings = 0;
    let currentSum = 0;

    for (const key of sortedKeys) {
      currentSum += this._get(key);
      if (currentSum > maxBookings) maxBookings = currentSum;
    }

    return maxBookings;
  }
}

var obj = new MyCalendar();
console.log(obj.book(10, 20));
console.log(obj.book(50, 60));
console.log(obj.book(10, 40));
console.log(obj.book(5, 15));
console.log(obj.book(5, 10));
console.log(obj.book(25, 55));
