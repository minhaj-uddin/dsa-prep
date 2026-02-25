const sherlockAndAnagrams = (s) => {
  const map = new Map();
  let count = 0;

  // Generate all substrings
  for (let i = 0; i < s.length; i++) {
    let temp = "";
    for (let j = i; j < s.length; j++) {
      temp += s[j];

      // Canonical form: sorted substring
      const key = temp.split("").sort().join("");
      map.set(key, (map.get(key) || 0) + 1);
    }
  }

  // Count anagrammatic pairs
  for (let val of map.values()) {
    if (val > 1) {
      count += (val * (val - 1)) / 2;
    }
  }

  return count;
};

const s = "abba";
const result = sherlockAndAnagrams(s);
console.log(result);
