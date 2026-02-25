const palindromeIndex = (s) => {
  let left = 0;
  let right = s.length - 1;

  const isPalindrome = (l, r) => {
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l++;
      r--;
    }
    return true;
  };

  while (left < right) {
    if (s[left] === s[right]) {
      left++;
      right--;
    } else {
      if (isPalindrome(left + 1, right)) return left;
      if (isPalindrome(left, right - 1)) return right;
      return -1;
    }
  }

  return -1;
};

const s = "aaab";
const result = palindromeIndex(s);
console.log(result);
