const minRemoveToMakeValid = (str) => {
  const stack = [];
  const res = str.split("");

  for (let i = 0; i < res.length; i++) {
    if (res[i] === "(") {
      stack.push(i);
    } else if (res[i] === ")" && stack.length) {
      stack.pop();
    } else if (res[i] === ")") {
      res[i] = "";
    }
  }

  while (stack.length) {
    const curIndex = stack.pop();
    res[curIndex] = "";
  }

  return res.join("");
};

const input = "a)b(c)d";
const result = minRemoveToMakeValid(input);
console.log(result);
