const groupAnagram = (s1) => {
  if (!s1) return [];

  const wordsMap = new Map();

  // Traverse the array of string
  for (let i = 0; i < s1.length; i++) {
    const key = s1[i];
    // Sort the current element
    const sortedKey = sort(s1[i]);

    // Check if current element, insert if doesn't exists in map
    if (wordsMap.has(sortedKey)) {
      const currentValue = wordsMap.get(sortedKey);
      if (currentValue) currentValue.push(key);
      wordsMap.set(sortedKey, currentValue);
    } else {
      wordsMap.set(sortedKey, [key]);
    }
  }

  return wordsMap.values();
};

const sort = (word) => {
  const sorted = [];
  for (let i = 0; i < word.length; i++) {
    sorted.push(word[i]);
  }
  return sorted.sort().join("");
};

const input = ["eat", "tea", "tan", "ate", "nat", "bat"];
const result = groupAnagram(input);
console.log(result);
