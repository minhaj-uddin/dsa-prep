const mergeSort = (arr) => {
  // Base case: arrays are already sorted
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // Recursively split & merge
  return merge(mergeSort(left), mergeSort(right));
};

const merge = (left, right) => {
  let result = [];
  let i = 0;
  let j = 0;

  // Compare elements in left & right arrays
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Add remaining elements (only one of these will contain items)
  return result.concat(left.slice(i)).concat(right.slice(j));
};

const input = [64, 33, 25, 47, 12, 22, 11, 90];
console.log("Original:", input);
const sorted = mergeSort(input);
console.log("Sorted:", sorted);
