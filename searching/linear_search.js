const linearSearch = (arr, target) => {
  if (!arr || arr.length === 0) return -1;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }

  return -1;
};

const target = 30;
const arr = [10, 20, 30, 40];
const result = linearSearch(arr, target);
console.log(result);
