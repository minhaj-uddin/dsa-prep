const lengthOfLongestSubstring = (s) => {
  if (s.length <= 1) return s.length;

  const seen = new Map();
  let maxLength = 0;
  let left = 0;

  for (let right = left; right < s.length; right++) {
    const char = s[right];
    const prevIndex = seen.get(char);

    if (seen.get(char) >= left) {
      left = prevIndex + 1;
    }

    seen.set(char, right);
    const current = right - left + 1;
    maxLength = Math.max(maxLength, current);
  }

  return maxLength;
};

const s = "pwwkew";
const result = lengthOfLongestSubstring(s);
console.log(result);
