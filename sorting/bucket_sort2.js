const bucketSort = (arr, bucketCount = 3) => {
  if (arr.length === 0) return arr;

  const min = Math.min(...arr);
  const max = Math.max(...arr);

  // Avoid division by zero if all numbers are equal
  if (min === max) return arr.slice();

  // Create empty buckets
  const buckets = Array.from({ length: bucketCount }, () => []);

  // Range for each bucket
  const bucketRange = (max - min + 1) / bucketCount;

  // Distribute values into buckets
  for (let num of arr) {
    let index = Math.floor((num - min) / bucketRange);
    if (index === bucketCount) index--;
    buckets[index].push(num);
    console.log(buckets);
  }

  // Sort each bucket and combine
  return buckets.flatMap(insertionSort);
};

const insertionSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }

  return arr;
};

const input = [64, 34, 25, 12, 22, 11, 90, 45, 78, 53, 82, 29];
console.log("Original:", input);
const sorted = bucketSort(input);
console.log("Sorted:", sorted);
