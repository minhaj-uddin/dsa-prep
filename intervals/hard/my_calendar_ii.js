// Overlapped Intervals
class MyCalendar {
  constructor() {
    this.bookings = [];
    this.overlaps = [];
  }

  book(start, end) {
    for (const [os, oe] of this.overlaps) {
      if (start < oe && end > os) return false;
    }

    for (const [bs, be] of this.bookings) {
      if (start < be && end > bs) {
        this.overlaps.push([Math.max(start, bs), Math.min(end, be)]);
      }
    }

    this.bookings.push([start, end]);
    return true;
  }
}

// Line Sweep + TreeMap
class MyCalendar {
  constructor() {
    this.timeline = new Map();
  }

  book(start, end) {
    this.timeline.set(start, (this.timeline.get(start) || 0) + 1);
    this.timeline.set(end, (this.timeline.get(end) || 0) - 1);

    // Sweep through sorted time points
    const sortedTimes = [...this.timeline.keys()].sort((a, b) => a - b);

    let active = 0;
    for (const time of sortedTimes) {
      active += this.timeline.get(time);

      if (active >= 3) {
        // Revert changes if triple booking detected
        this.timeline.set(start, this.timeline.get(start) - 1);
        this.timeline.set(end, this.timeline.get(end) + 1);

        if (this.timeline.get(start) === 0) this.timeline.delete(start);
        if (this.timeline.get(end) === 0) this.timeline.delete(end);

        return false;
      }
    }

    return true;
  }
}
