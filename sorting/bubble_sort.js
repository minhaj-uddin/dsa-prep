const bubbleSort = (arr) => {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    if (!swapped) break;
  }

  return arr;
};

const input = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", input);
const sorted = bubbleSort(input);
console.log("Sorted:", sorted);
