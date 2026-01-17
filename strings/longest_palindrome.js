const longestPalindrome = (s) => {
  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(s, i, i);
    expandAroundCenter(s, i, i + 1);
  }
  return s.substring(start, end + 1);
};

const expandAroundCenter = (s, left, right) => {
  while (left >= 0 && right < s.length && s[left] == s[right]) {
    left--;
    right++;
  }

  left = left + 1;
  right = right - 1;

  if (end - start + 1 < right - left + 1) {
    start = left;
    end = right;
  }
};

let start = 0;
let end = 0;

const input = "acbcba";
const result = longestPalindrome(input);
console.log(result);
