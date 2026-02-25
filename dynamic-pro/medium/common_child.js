// LCS: Bottom-Up Approach
const commonChild = (s1, s2) => {
  const n = s1.length;
  const m = s2.length;
  const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to build LCS
  const printLCS = () => {
    let i = n;
    let j = m;
    const lcs = [];

    while (i > 0 && j > 0) {
      if (s1[i - 1] === s2[j - 1]) {
        lcs.push(s1[i - 1]);
        i--; // Move diagonally left
        j--; // Move diagonally up
      } else if (dp[i - 1][j] > dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }

    console.log(lcs.reverse().join(""));
  };

  printLCS();
  return dp[n][m];
};

// LCS: Top-Down Approach
const commonChild2 = (s1, s2) => {
  const n = s1.length;
  const memo = Array.from({ length: n }, () => Array(n).fill(-1));

  function lcs(i, j) {
    // Base case - early return
    if (i === n || j === n) return 0;

    // Memoized result
    if (memo[i][j] !== -1) {
      return memo[i][j];
    }

    // Recurrence relation
    if (s1[i] === s2[j]) {
      memo[i][j] = 1 + lcs(i + 1, j + 1);
    } else {
      memo[i][j] = Math.max(lcs(i + 1, j), lcs(i, j + 1));
    }

    return memo[i][j];
  }

  return lcs(0, 0);
};

const s1 = "ABCD";
const s2 = "ABED";
const result = commonChild(s1, s2);
const result2 = commonChild2(s1, s2);
console.log(result, result2);
