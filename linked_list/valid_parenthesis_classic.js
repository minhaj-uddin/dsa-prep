const isValid = (s) => {
  while (s.includes("()") || s.includes("{}") || s.includes("[]")) {
    s = s.replace("()", "");
    s = s.replace("{}", "");
    s = s.replace("[]", "");
  }
  return s === "";
};

input = "{[()]}";
console.log(isValid(input));
