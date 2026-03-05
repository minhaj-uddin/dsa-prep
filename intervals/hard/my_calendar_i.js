// Brute Force - O(N)
class MyCalendar {
  constructor() {
    this.bookings = [];
  }

  book = (startTime, endTime) => {
    if (!startTime || !endTime) return [];

    for (let [s, e] of this.bookings) {
      if (Math.max(s, startTime) < Math.min(e, endTime)) return false;
      // if (startTime < e && endTime > s) return false;
    }

    this.bookings.push([startTime, endTime]);
    return true;
  };
}

// Binary Search + Sorted Array O(Log N)
class MyCalendar {
  constructor() {
    this.bookings = [];
  }

  book(startTime, endTime) {
    if (!startTime || !endTime) return [];
    if (startTime >= endTime) return false;

    const binarySearch = (target) => {
      let left = 0;
      let right = this.bookings.length;

      while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (this.bookings[mid][0] < target) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }

      return left;
    };

    // Pick interval index position
    const idx = binarySearch(startTime);

    // Check previous interval
    if (idx > 0 && this.bookings[idx - 1][1] > startTime) {
      return false;
    }

    // Check next interval
    if (idx < this.bookings.length && this.bookings[idx][0] < endTime) {
      return false;
    }

    // Insert at correct position
    this.bookings.splice(idx, 0, [startTime, endTime]);
    return true;
  }
}

// Binary Search Tree (BST) - O(Log N)
class TreeNode {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.left = null;
    this.right = null;
  }
}

class MyCalendar {
  constructor() {
    this.root = null;
  }

  book(start, end) {
    if (!this.root) {
      this.root = new TreeNode(start, end);
      return true;
    }

    // Initialize with root
    let current = this.root;

    while (true) {
      // New event goes to the left
      if (end <= current.start) {
        if (!current.left) {
          current.left = new TreeNode(start, end);
          return true;
        }
        current = current.left;
      }
      // New event goes to the right
      else if (start >= current.end) {
        if (!current.right) {
          current.right = new TreeNode(start, end);
          return true;
        }
        current = current.right;
      }
      // Overlap detected
      else {
        return false;
      }
    }
  }
}
