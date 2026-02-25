const exponentialSearch = (arr, target) => {
  if (arr[0] === target) return 0;

  let i = 1;
  while (i < arr.length && arr[i] <= target) {
    i *= 2;
  }

  return binarySearch(arr.slice(i / 2, Math.min(i, arr.length)), target);
};

const target = 30;
const arr = [10, 20, 30, 40, 50];
const result = exponentialSearch(arr, target);
console.log(result);
