const equalizeArray = (arr) => {
  const frequencyMap = new Map();

  // Count frequencies
  for (const num of arr) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  }

  // Find maximum frequency
  let maxFrequency = 0;
  for (let frequency of frequencyMap.values()) {
    maxFrequency = Math.max(maxFrequency, frequency);
  }

  // Minimum deletions
  return arr.length - maxFrequency;
};
