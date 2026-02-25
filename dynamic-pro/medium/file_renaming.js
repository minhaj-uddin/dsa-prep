const renameFile = (newName, oldName) => {
  const MOD = 1_000_000_007;
  const n = newName.length;
  const m = oldName.length;

  // dp[j] = number of ways using oldName
  let dp = new Array(m + 1).fill(1);

  for (let i = 1; i <= n; i++) {
    const dpp = new Array(m + 1).fill(0);
    for (let j = i; j <= m; j++) {
      dpp[j] = dpp[j - 1];
      if (newName[i - 1] === oldName[j - 1]) {
        dpp[j] = (dpp[j] + dp[j - 1]) % MOD;
      }
    }
    dp = dpp;
  }

  return dp[m];
};

const newName = "abaa";
const oldName = "abcaba";
const result = renameFile(newName, oldName);
console.log(result);
