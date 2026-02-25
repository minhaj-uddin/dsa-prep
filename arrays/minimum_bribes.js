const minimumBribes = (q) => {
  let minBribes = 0;

  for (let i = 0; i < q.length; i++) {
    if (q[i] - (i + 1) > 2) {
      return "Too chaotic";
    }

    for (let j = Math.max(0, q[i] - 2); j < i; j++) {
      if (q[j] > q[i]) {
        minBribes++;
      }
    }
  }

  return minBribes;
};

q = [2, 1, 5, 3, 4];
const result = minimumBribes(q);
console.log(result);
