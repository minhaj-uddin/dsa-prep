const minimumSwaps = (arr) => {
  let swaps = 0;
  let i = 0;

  while (i < arr.length) {
    const correctIndex = arr[i] - 1;
    if (arr[i] !== arr[correctIndex]) {
      [arr[i], arr[correctIndex]] = [arr[correctIndex], arr[i]];
      swaps++;
    } else {
      i++;
    }
  }

  return swaps;
};

const arr = [7, 1, 3, 2, 4, 5, 6];
const result = minimumSwaps(arr);
console.log(result);
