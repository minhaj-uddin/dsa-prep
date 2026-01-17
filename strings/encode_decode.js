const encodeString = (arr) => {
  let encoded = "";
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    encoded += current.length + "#" + current;
  }
  return encoded;
};

const decodeString = (str) => {
  const decoded = [];
  let i = 0;

  while (i < str.length) {
    let j = i;
    while (str[j] !== "#") j++;

    const length = Number(str.slice(i, j));
    const word = str.slice(j + 1, j + 1 + length);
    decoded.push(word);
    i = j + 1 + length;
  }
  return decoded;
};

const arr = ["lint", "mint", "fit", "lemon", "biscuit"];
const encoded = encodeString(arr);
console.log(encoded);

const decoded = decodeString(encoded);
console.log(decoded);
