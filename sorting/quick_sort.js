const quickSort = (arr, left = 0, right = arr.length - 1) => {
  if (left < right) {
    const pivotIndex = partition(arr, left, right);

    // Recursively sort elements before & after partition
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
};

const partition = (arr, left, right) => {
  const pivot = arr[right]; // choose last element as pivot
  let partitionIndex = left; // index of the smaller element

  for (let j = left; j < right; j++) {
    console.log(`${arr[j]} < ${pivot}: `, arr[j] < pivot);
    if (arr[j] < pivot) {
      swap(arr, partitionIndex, j);
      partitionIndex++;
    }
  }

  // Place pivot in the correct sorted position
  swap(arr, partitionIndex, right);

  return partitionIndex;
};

const swap = (arr, left, right) => {
  console.log(`swap: `, arr[left], arr[right]);
  const temp = arr[left];
  arr[left] = arr[right];
  arr[right] = arr[temp];
};

const getKthLargest = (arr, k) => {
  const indexToFind = arr.length - k;
  quickSort(arr, 0, arr.length - 1);
  return arr[indexToFind];
};

const input = [64, 33, 25, 47, 12, 11, 90, 22];
console.log("Original:", input);

const k = getKthLargest(input, 3);

console.log("Sorted:", input);
console.log("Kth Largest: ", k);
