const countingSort = (arr) => {
  if (arr.length === 0) return arr;

  // Find the maximum element
  const max = Math.max(...arr);

  // Initialize count array
  const count = new Array(max + 1).fill(0);

  // Count occurrences
  for (let num of arr) {
    count[num]++;
  }

  // Convert count array to cumulative counts
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  // Build the output array
  const output = new Array(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) {
    const num = arr[i];
    output[count[num] - 1] = num;
    count[num]--;
  }

  return output;
};

const input = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", input);
const sorted = countingSort(input);
console.log("Sorted:", sorted);
