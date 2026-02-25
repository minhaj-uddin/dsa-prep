const longestPalindrome = (s) => {
  if (!s.length || s.length === 1) return s;

  let start = 0;
  let maxLength = 1;

  const expandAroundCenter = (left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }

    const length = right - left - 1;
    if (length > maxLength) {
      start = left + 1;
      maxLength = length;
    }
  };

  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i, i); // Odd length
    expandAroundCenter(i, i + 1); // Even length
  }

  return s.substring(start, start + maxLength);
};

const s = "babad";
const result = longestPalindrome(s);
console.log(result);
