function countSpecialSubstrings(s) {
  const n = s.length;
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (n === 2) return s[0] === s[1] ? 3 : 2;

  let groups = [];
  let result = 0;

  // Step 1: Group consecutive characters
  let i = 0;
  while (i < n) {
    let char = s[i];
    let count = 0;

    while (i < n && s[i] === char) {
      count++;
      i++;
    }

    groups.push({ char, count });
  }

  // Step 2: Count Type 1 substrings
  for (let g of groups) {
    result += (g.count * (g.count + 1)) / 2;
  }

  // Step 3: Count Type 2 substrings
  for (let i = 1; i < groups.length - 1; i++) {
    if (groups[i].count === 1 && groups[i - 1].char === groups[i + 1].char) {
      result += Math.min(groups[i - 1].count, groups[i + 1].count);
    }
  }

  return result;
}

const s = "aabaa";
const result = countSpecialSubstrings(s);
console.log(result);
