function matchingStrings(strings, queries) {
  const frequencyMap = new Map();

  for (const s of strings) {
    frequencyMap.set(s, (frequencyMap.get(s) || 0) + 1);
  }

  const results = [];
  for (const q of queries) {
    results.push(frequencyMap.get(q) || 0);
  }

  return results;
}

const stringList = ["ab", "ab", "abc"];
const queries = ["ab", "abc", "bc"];
const result = matchingStrings(stringList, queries);
console.log(result);
