const climbingStairs = (cost, approach) => {
  if (approach === 1) {
    // Top Down Approach
    return topDownApproach(cost);
  } else if (approach === 2) {
    // bottom Up Appraoch
    return bottomUpAppraoch(cost);
  }
};

const bottomUpAppraoch = (cost) => {
  let dp1 = cost[0];
  let dp2 = cost[1];
  const n = cost.length;

  for (let i = 2; i < n; i++) {
    const current = cost[i] + Math.min(dp1, dp2);
    dp1 = dp2;
    dp2 = current;
  }

  return Math.min(dp1, dp2);
};

const topDownApproach = (cost) => {
  const dp = [];
  const n = cost.length;
  return Math.min(minCost(cost, n - 1, dp), minCost(cost, n - 2, dp));
};

const minCost = (cost, i, dp) => {
  if (i < 0) return 0;
  if (i === 0 || i === 1) return cost[i];

  if (dp[i] !== undefined) return dp[i];
  dp[i] =
    cost[i] + Math.min(minCost(cost, i - 1, dp), minCost(cost, i - 2, dp));

  return dp[i];
};

const cost = [20, 15, 30, 5, -6, 12];
let result = climbingStairs(cost, 1);
console.log(result);

result = climbingStairs(cost, 2);
console.log(result);
