const isAnagram = (s1, s2) => {
  if (!s1 || !s2) return false;
  if (s1.length !== s2.length) return false;

  let freq = {};
  for (let i = 0; i < s1.length; i++) {
    freq[s1[i]] = (freq[s1[i]] || 0) + 1;
    freq[s2[i]] = (freq[s2[i]] || 0) - 1;
  }

  for (const key in freq) {
    if (freq[key] !== 0) return false;
  }

  return true;
};

const s1 = "anagram";
const s2 = "nagaram";
const result = isAnagram(s1, s2);
console.log(result);
