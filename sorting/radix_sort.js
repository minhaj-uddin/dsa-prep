const radixSort = (arr) => {
  if (arr.length === 0) return arr;

  // Find maximum number to know number of digits
  const max = Math.max(...arr);

  // Perform counting sort for each digit place
  let exp = 1; // 1, 10, 100, 1000...
  while (Math.floor(max / exp) > 0) {
    arr = countingSortByDigit(arr, exp);
    exp *= 10;
  }

  return arr;
};

const countingSortByDigit = (arr, exp) => {
  const output = new Array(arr.length).fill(0);
  const count = new Array(10).fill(0); // base 10 digits

  // Count occurrences of digits
  for (let num of arr) {
    const digit = Math.floor(num / exp) % 10;
    count[digit]++;
  }

  // Convert to cumulative counts
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Build sorted array (stable, iterate from end)
  for (let i = arr.length - 1; i >= 0; i--) {
    const num = arr[i];
    const digit = Math.floor(num / exp) % 10;
    output[count[digit] - 1] = num;
    count[digit]--;
  }

  return output;
};

const input = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", input);
const sorted = radixSort(input);
console.log("Sorted:", sorted);
