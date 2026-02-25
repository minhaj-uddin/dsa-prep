const alternatingCharacters = (s) => {
  let deletions = 0;
  for (let i = 0; i < s.length - 1; i++) {
    if (s[i] == s[i + 1]) {
      deletions++;
    }
  }

  return deletions;
};

const s = "AABBA";
const result = alternatingCharacters(s);
console.log(result);
