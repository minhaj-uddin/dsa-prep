const isValidParenthesis = (s) => {
  if (s.length % 2 !== 0) return false;

  const stack = [];
  const pairs = {
    "(": ")",
    "{": "}",
    "[": "]",
  };

  for (let i = 0; i < s.length; i++) {
    if (pairs[s[i]]) {
      stack.push(s[i]);
    } else {
      const lastBracket = stack.pop();
      const currentBracket = pairs[lastBracket];

      if (currentBracket !== s[i]) {
        return false;
      }
    }
  }

  return stack.length === 0;
};

input = "{[({[()]})]}";
console.log(isValidParenthesis(input));
