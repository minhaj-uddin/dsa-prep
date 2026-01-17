const backspaceCompare = (s, t) => {
  const finalS = builtString(s);
  const finalT = builtString(t);

  if (finalS.length !== finalT.length) {
    return false;
  }

  for (let p = 0; p < finalS.length; p++) {
    if (finalS[p] !== finalT[p]) {
      return false;
    }
  }

  return true;
};

const builtString = (inputString) => {
  const finalChars = [];

  for (let p = 0; p < inputString.length; p++) {
    const currentChar = inputString[p];

    if (currentChar !== "#") {
      finalChars.push(currentChar);
    } else {
      finalChars.pop();
    }
  }

  return finalChars;
};

const s1 = "a";
const s2 = "z#t";
const result = backspaceCompare(s1, s2);
console.log(result);
