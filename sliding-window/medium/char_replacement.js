// Version 1: Using Array
const characterReplacement = (s, k) => {
  const n = s.length;
  if (!s || k < 0) return 0;
  if (s <= 1 || k >= n) return n;

  const ALPHABET_SIZE = 26;
  const CHAR_CODE_OFFSET = 65;

  const getCharIndex = (char) => char.charCodeAt(0) - CHAR_CODE_OFFSET;

  const freq = new Array(ALPHABET_SIZE).fill(0);

  let left = 0;
  let maxFrequency = 0;

  let baseLeft = 0;
  let baseRight = 0;

  for (let right = 0; right < n; right++) {
    const index = getCharIndex(s[right]);
    maxFrequency = Math.max(maxFrequency, ++freq[index]);

    const windowSize = right - left + 1;

    if (windowSize - maxFrequency > k) {
      const leftIndex = getCharIndex(s[left]);
      freq[leftIndex]--;
      left++;

      baseLeft = left;
      baseRight = right;
    }
  }

  return {
    substring: s.substring(baseLeft, baseRight + 1),
    length: baseRight - baseLeft + 1,
  };
};

// Version 2: Using HashMap
const getMinReplacement = (s, k) => {
  let maxLength = 0;
  let maxFrequency = 0;
  const frequencies = new Map();

  const setFrequency = (key, value) => frequencies.set(key, value);
  const getFrequency = (key) => frequencies.get(key) || 0;
  const getLength = (left, right) => right - left + 1;

  let left = 0;
  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right];

    setFrequency(currentChar, getFrequency(currentChar) + 1);
    maxFrequency = Math.max(maxFrequency, getFrequency(currentChar));

    if (getLength(left, right) - maxFrequency > k) {
      setFrequency(s[left], getFrequency(s[left]) - 1);
      left++;
    }

    // Left -> Right: Sliding window valid
    maxLength = Math.max(maxLength, getLength(left, right));
  }

  return maxLength;
};

const k = 1;
const s = "AABABBA";
const result = characterReplacement(s, k);
console.log(result);
