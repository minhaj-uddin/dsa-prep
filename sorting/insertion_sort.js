const insertionSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    // Shift elements greater than key to the right
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    // Insert key into its correct position
    arr[j + 1] = key;
  }

  return arr;
};

const input = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", input);
const sorted = insertionSort(input);
console.log("Sorted:", sorted);
