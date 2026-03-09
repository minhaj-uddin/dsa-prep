// Approach: Sorted Index
// class ExamRoom {
//   constructor(n) {
//     this.N = n;
//     this.students = [];
//   }

//   seat() {
//     const s = this.students;

//     if (s.length === 0) {
//       s.push(0);
//       return 0;
//     }

//     let seat = 0;
//     let maxDist = s[0];

//     for (let i = 1; i < s.length; i++) {
//       const curr = s[i];
//       const prev = s[i - 1];
//       const d = Math.floor((curr - prev) / 2);

//       if (d > maxDist) {
//         maxDist = d;
//         seat = prev + d;
//       }
//     }

//     const last = this.N - 1 - s[s.length - 1];
//     if (last > maxDist) seat = this.N - 1;

//     this.insert(seat);
//     return seat;
//   }

//   insert(val) {
//     const s = this.students;
//     let left = 0;
//     let right = s.length;

//     while (left < right) {
//       const mid = (left + right) >> 1;
//       if (s[mid] < val) {
//         left = mid + 1;
//       } else {
//         right = mid;
//       }
//     }

//     s.splice(left, 0, val);
//   }

//   leave(p) {
//     console.log(this.students);
//     const i = this.students.indexOf(p);
//     if (i >= 0) {
//       this.students.splice(i, 1);
//       console.log(this.students);
//       return p;
//     }
//   }
// }

class MaxHeap {
  constructor(compare) {
    this.data = [];
    this.compare = compare;
  }

  size = () => this.data.length;
  peek = () => this.data[0];

  push = (val) => {
    this.data.push(val);
    this.bubbleUp(this.data.length - 1);
  };

  pop = () => {
    if (this.size() === 1) return this.data.pop();

    const top = this.data[0];
    this.data[0] = this.data.pop();
    this.bubbleDown(0);
    return top;
  };

  bubbleUp = (i) => {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.compare(this.data[i], this.data[p]) <= 0) break;

      [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
      i = p;
    }
  };

  bubbleDown = (i) => {
    const n = this.data.length;

    while (true) {
      let largest = i;
      let l = 2 * i + 1;
      let r = 2 * i + 2;

      if (l < n && this.compare(this.data[l], this.data[largest]) > 0)
        largest = l;

      if (r < n && this.compare(this.data[r], this.data[largest]) > 0)
        largest = r;

      if (largest === i) break;

      [this.data[i], this.data[largest]] = [this.data[largest], this.data[i]];
      i = largest;
    }
  };
}

// Approach: PQ
class ExamRoom {
  constructor(n) {
    this.n = n;

    this.startMap = new Map();
    this.endMap = new Map();

    this.heap = new MaxHeap((a, b) => {
      const distA = this.distance(a);
      const distB = this.distance(b);

      if (distA === distB) {
        return this.seatPos(b) - this.seatPos(a);
      }
      return distA - distB;
    });

    this.addInterval([-1, n]);
  }

  distance = ([l, r]) => {
    if (l === -1) return r;
    if (r === this.n) return this.n - 1 - l;
    return Math.floor((r - l) / 2);
  };

  seatPos = ([l, r]) => {
    if (l === -1) return 0;
    if (r === this.n) return this.n - 1;
    return Math.floor((l + r) / 2);
  };

  addInterval = (interval) => {
    const [l, r] = interval;
    this.startMap.set(l, interval);
    this.endMap.set(r, interval);
    this.heap.push(interval);
  };

  removeInterval = (interval) => {
    const [l, r] = interval;
    this.startMap.delete(l);
    this.endMap.delete(r);
  };

  seat = () => {
    let interval;

    while (true) {
      interval = this.heap.pop();
      const [l, r] = interval;

      if (
        this.startMap.get(l) === interval &&
        this.endMap.get(r) === interval
      ) {
        break;
      }
    }

    const [l, r] = interval;

    let seat;
    if (l === -1) seat = 0;
    else if (r === this.n) seat = this.n - 1;
    else seat = Math.floor((l + r) / 2);

    this.removeInterval(interval);

    this.addInterval([l, seat]);
    this.addInterval([seat, r]);

    return seat;
  };

  leave = (p) => {
    const left = this.endMap.get(p);
    const right = this.startMap.get(p);

    this.removeInterval(left);
    this.removeInterval(right);

    const merged = [left[0], right[1]];
    this.addInterval(merged);
  };
}

const n = 10;
const examRoom = new ExamRoom(n);
console.log(examRoom.seat());
console.log(examRoom.seat());
console.log(examRoom.seat());
console.log(examRoom.seat());
console.log(examRoom.leave(4));
console.log(examRoom.seat());
