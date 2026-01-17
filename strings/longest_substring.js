const getLongestSubstring = (s) => {
  if (s.length <= 1) return s.length;

  const seen = new Map();
  let left = 0;
  let longest = 0;

  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right];
    const prevSeenChar = seen[currentChar];

    if (prevSeenChar >= left) {
      left = prevSeenChar + 1;
    }

    seen[currentChar] = right;

    longest = Math.max(longest, right - left + 1);
  }

  return longest;
};

const input = "pwwkew";
const result = getLongestSubstring(input);
console.log(result);
