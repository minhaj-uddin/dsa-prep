const heapSort = (arr) => {
  let n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Extract elements one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to the end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    // Heapify the reduced heap
    heapify(arr, i, 0);
  }

  return arr;
};

// Heapify a subtree rooted at index i, heap size = n
function heapify(arr, n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  // If left child is larger
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // If right child is larger
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // If largest is not the root
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

const input = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", input);
const sorted = heapSort(input);
console.log("Sorted:", sorted);
