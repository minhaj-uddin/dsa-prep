const minWindow = (source, target) => {
  if (!source || !target || source.length < target.length) {
    return "";
  }

  const sourceMap = new Map();
  const targetMap = buildFrequencyMap(target);

  const requiredChars = targetMap.size;
  let formedChars = 0;

  let left = 0;
  let minWindowLength = Infinity;
  let minWindowStart = 0;

  for (let right = 0; right < source.length; right++) {
    const rightChar = source[right];

    sourceMap.set(rightChar, (sourceMap.get(rightChar) || 0) + 1);

    if (
      targetMap.has(rightChar) &&
      sourceMap.get(rightChar) === targetMap.get(rightChar)
    ) {
      formedChars++;
    }

    while (formedChars === requiredChars) {
      const windowLength = right - left + 1;

      if (windowLength < minWindowLength) {
        minWindowLength = windowLength;
        minWindowStart = left;
      }

      const leftChar = source[left];
      sourceMap.set(leftChar, sourceMap.get(leftChar) - 1);

      if (
        targetMap.has(leftChar) &&
        sourceMap.get(leftChar) < targetMap.get(leftChar)
      ) {
        formedChars--;
      }

      left++;
    }
  }

  return minWindowLength === Infinity ? "" : minWindowLength;
};

const buildFrequencyMap = (str) => {
  const frequencyMap = new Map();

  for (const char of str) {
    frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);
  }

  return frequencyMap;
};

const target = "ABC";
const source = "ADOBECODEBANC";
const result = minWindow(source, target);
console.log(result);
