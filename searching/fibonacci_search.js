const fibonacciSearch = (arr, target) => {
  let fib2 = 0;
  let fib1 = 1;
  let fib = fib1 + fib2;
  let n = arr.length;

  while (fib < n) {
    fib2 = fib1;
    fib1 = fib;
    fib = fib1 + fib2;
  }

  let offset = -1;

  while (fib > 1) {
    let i = Math.min(offset + fib2, n - 1);

    if (arr[i] < target) {
      fib = fib1;
      fib1 = fib2;
      fib2 = fib - fib1;
      offset = i;
    } else if (arr[i] > target) {
      fib = fib2;
      fib1 -= fib2;
      fib2 = fib - fib1;
    } else {
      return i;
    }
  }

  return -1;
};

const target = 20;
const arr = [10, 20, 30, 40, 50];
const result = fibonacciSearch(arr, target);
console.log(result);
