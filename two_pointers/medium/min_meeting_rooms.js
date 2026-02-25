const minMeetingRooms = (intervals) => {
  if (!intervals?.length) return 0;

  const startTimes = intervals.map((i) => i[0]).sort((a, b) => a - b);
  const endTimes = intervals.map((i) => i[1]).sort((a, b) => a - b);

  let totalRooms = 0;
  let maxRooms = 0;
  let p1 = 0;
  let p2 = 0;

  while (p1 < startTimes.length) {
    if (startTimes[p1] < endTimes[p2]) {
      totalRooms++;
      p1++;
      maxRooms = Math.max(maxRooms, totalRooms);
    } else {
      totalRooms--;
      p2++;
    }
  }

  return maxRooms;
};

const intervals = [
  [0, 30],
  [5, 10],
  [15, 20],
];
const result = minMeetingRooms(intervals);
console.log(result);
