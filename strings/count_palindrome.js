const countPalindrome = (s) => {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    count += findPalindrome(s, i, i);
    count += findPalindrome(s, i, i + 1);
  }
  return count;
};

const findPalindrome = (s, left, right) => {
  let count = 0;
  while (left >= 0 && right < s.length && s[left] == s[right]) {
    count++;
    left--;
    right++;
  }
  return count;
};

const input = "babad";
const result = countPalindrome(input);
console.log(result);
