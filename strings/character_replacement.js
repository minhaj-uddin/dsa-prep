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

const k = 2;
const input = "AABABBA";
const result = getMinReplacement(input, k);
console.log(result);
