const isAlmostPalindrome = (s) => {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      return (
        validSubPalindrome(s, left + 1, right) ||
        validSubPalindrome(s, left, right - 1)
      );
    }
    left++;
    right--;
  }

  return true;
};

const validSubPalindrome = (s, left, right) => {
  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
};

const input = "race a bar";
const result = isAlmostPalindrome(input);
console.log(result);
