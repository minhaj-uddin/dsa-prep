const isPalindrome = (s) => {
  if (!s.length) return true;

  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (!isAlphaNumeric(s[left])) left++;
    else if (!isAlphaNumeric(s[right])) right--;
    else {
      if (s[left].toLowerCase() !== s[right].toLowerCase()) {
        return false;
      }
      left++;
      right--;
    }
  }

  return true;
};

const isAlphaNumeric = (char) => {
  return /[a-z0-9]/i.test(char);
};

const s = "race a car";
const result = isPalindrome(s);
console.log(result);
