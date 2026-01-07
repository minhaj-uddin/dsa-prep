const shellSort = (arr) => {
  let n = arr.length;
  let gap = 1;

  // Build initial gap using Knuth sequence
  while (gap < Math.floor(n / 3)) {
    gap = 3 * gap + 1;
  }

  // Gap-based insertion sort
  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      let temp = arr[i];
      let j = i;

      // Shift elements until correct position is found
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }

      arr[j] = temp;
    }

    // Reduce gap
    gap = Math.floor((gap - 1) / 3);
  }

  return arr;
};

const input = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", input);
const sorted = shellSort(input);
console.log("Sorted:", sorted);
