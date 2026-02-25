// Using HashMap version
const isAnagram = (s, t) => {
  if (s.length === 0 && t.length === 0) return true;
  if (s.length === 0 || t.length === 0) return false;
  if (s.length !== t.length) return false;

  const freqMap = new Map();
  for (let i = 0; i < s.length; i++) {
    freqMap.set(s[i], (freqMap.get(s[i]) ?? 0) + 1);
    freqMap.set(t[i], (freqMap.get(t[i]) ?? 0) - 1);
  }

  for (const count of freqMap.values()) {
    if (count !== 0) return false;
  }

  return true;
};

// Array-based version
const isAnagram2 = (s, t) => {
  if (s.length === 0 && t.length === 0) return true;
  if (s.length === 0 || t.length === 0) return false;
  if (s.length !== t.length) return false;

  const frequency = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    frequency[s.charCodeAt(i) - 97]++;
    frequency[t.charCodeAt(i) - 97]--;
  }

  return frequency.every((c) => c === 0);
};

const s = "listen";
const t = "silent";
const result = isAnagram(s, t);
console.log(result);
