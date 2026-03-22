const flightBookings = (bookings, n) => {
  const prefixSum = new Array(n + 1).fill(0);

  for (const [first, last, seat] of bookings) {
    prefixSum[first - 1] += seat;
    prefixSum[last] -= seat;
  }

  for (let i = 1; i < n; i++) {
    prefixSum[i] += prefixSum[i - 1];
  }

  return prefixSum.slice(0, n);
};

const bookings = [
  [1, 2, 10],
  [2, 3, 20],
  [2, 5, 25],
];
const n = 5;
const result = flightBookings(bookings, n);
console.log(result);
