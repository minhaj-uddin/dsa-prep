// Bit Manipulation Approach
const setSubsequences = (s) => {
  const n = s.length;
  const total = 1 << n;
  const result = [];

  for (let mask = 0; mask < total; mask++) {
    const subsequence = [];

    for (let i = 0; i < n; i++) {
      if ((mask & (1 << i)) !== 0) {
        subsequence.push(s[i]);
      }
    }

    result.push(subsequence.join(""));
  }

  return result;
};

// DFS Recursive Approach
const setSubsequences2 = (s) => {
  const result = [];

  const helper = (index, current) => {
    // Base case: reached end of string
    if (index === s.length) {
      result.push(current);
      return;
    }

    // Exclude the current character
    helper(index + 1, current);

    // Include the current character
    helper(index + 1, current + s[index]);
  };

  helper(0, "");
  return result;
};

// Backtracking Approach (Array-based)
const setSubsequences3 = (s) => {
  const ans = [];
  const current = [];

  function backtrack(index) {
    if (index === s.length) {
      ans.push([...current].join(""));
      return;
    }

    backtrack(index + 1);
    current.push(s[index]);
    backtrack(index + 1);
    current.pop();
  }

  backtrack(0);
  return ans;
};

const s = "abc";
console.log(setSubsequences(s));
console.log(setSubsequences2(s));
console.log(setSubsequences3(s));
