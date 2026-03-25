const getCollisionTimes = (cars) => {
  const n = cars.length;
  const result = new Array(n).fill(-1);
  const stack = []; // Stack stores indices

  // Process from right to left
  for (let i = n - 1; i >= 0; i--) {
    const [pi, si] = cars[i];

    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const [pj, sj] = cars[current];

      // Case 1: cannot catch
      if (si <= sj) {
        stack.pop();
        continue;
      }

      // Calculate collision time
      const time = (pj - pi) / (si - sj);

      // Case 2: valid collision
      if (result[current] === -1 || time <= result[current]) {
        result[i] = time;
        break;
      }

      // Case 3: invalid
      stack.pop();
    }

    stack.push(i);
  }

  return result;
};

const cars = [
  [1, 2],
  [2, 1],
  [4, 3],
  [7, 2],
];
const result = getCollisionTimes(cars);
console.log(result);
