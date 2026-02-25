// DP - Tabulation Version
const getCoinCombinations = (n, coins) => {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;

  for (let coin of coins) {
    for (let amount = coin; amount <= n; amount++) {
      dp[amount] += dp[amount - coin];
    }
  }

  return dp[n];
};

// Recursion + Memoization
const getWays = (n, coins) => {
  const memo = new Map();

  const dfs = (index, remaining) => {
    // Base cases
    if (remaining === 0) return 1;
    if (remaining < 0 || index === coins.length) return 0;

    const key = `${index}-${remaining}`;
    if (memo.has(key)) return memo.get(key);

    // Option 1: Include current coin (stay at same index)
    const include = dfs(index, remaining - coins[index]);

    // Option 2: Exclude current coin (move to next index)
    const exclude = dfs(index + 1, remaining);

    const totalWays = include + exclude;
    memo.set(key, totalWays);

    return totalWays;
  };

  return dfs(0, n);
};

const amount = 12;
const coins = [1, 2, 5, 10];

let result = getCoinCombinations(amount, coins);
console.log(result);

result = getWays(amount, coins);
console.log(result);
