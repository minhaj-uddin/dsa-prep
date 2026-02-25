// Approach 1: Using Hashmap
const groupAnagrams = (strs) => {
  const groupMap = new Map();

  for (const str of strs) {
    const sorted = str.split("").sort().join("");

    if (!groupMap.has(sorted)) {
      groupMap.set(sorted, []);
    }

    groupMap.get(sorted).push(str);
  }

  return Array.from(groupMap.values());
};

// Approach 2: Using Array
const groupAnagrams2 = (strs) => {
  let result = {};

  for (const str of strs) {
    let frequency = new Array(26).fill(0);

    for (const c of str) {
      frequency[c.charCodeAt(0) - 97]++;
    }

    let key = frequency.join("#");
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(str);
  }
  console.log(result);
  return Object.values(result);
};

const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
const result = groupAnagrams(strs);
console.log(result);
