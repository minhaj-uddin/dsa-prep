const countSubstrings = (s) => {
  if (!s.length) return 0;
  if (s.length === 1) return 1;
  if (s.length === 2) return s[0] === s[1] ? 3 : 2;

  let count = 0;
  const expandAroundCenter = (left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      count++;
      left--;
      right++;
    }
  };

  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i, i); // Odd length palindromes
    expandAroundCenter(i, i + 1); // Even length palindromes
  }

  return count;
};

const input = "aaa";
const result = countSubstrings(input);
console.log(result);
