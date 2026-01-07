const bucketSort = (arr, bucketCount = 2) => {
  if (arr.length === 0) return arr;

  // 1. Create buckets
  const buckets = Array.from({ length: bucketCount }, () => []);

  // 2. Put elements into buckets
  for (let num of arr) {
    let index = Math.floor(num * bucketCount);
    index = Math.min(index, bucketCount - 1);
    buckets[index].push(num);
    console.log(buckets);
  }

  // 3. Sort each bucket
  for (let i = 0; i < buckets.length; i++) {
    buckets[i] = insertionSort(buckets[i]);
  }

  // 4. Concatenate buckets
  return buckets.flat();
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

const input = [0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68, 1];
console.log("Original:", input);
const sorted = bucketSort(input);
console.log("Sorted:", sorted);
