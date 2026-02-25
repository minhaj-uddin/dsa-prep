const maxThroughput = (throughputs, scalingCosts, budget) => {
  const n = throughputs.length;

  let low = Math.min(...throughputs);
  let high = low + Math.floor(budget / Math.min(...scalingCosts));

  // If budget is zero
  if (budget === 0) return low;
  // Check if arrays are equal length
  if (throughputs.length !== scalingCosts.length) return low;

  const canAcheiveTarget = (target) => {
    let cost = 0;
    for (let i = 0; i < n; i++) {
      if (throughputs[i] < target) {
        cost += (target - throughputs[i]) * scalingCosts[i];
        if (cost > budget) return false;
      }
    }
    return true;
  };

  while (low < high) {
    const mid = Math.floor((low + high + 1) / 2);
    if (canAcheiveTarget(mid)) {
      low = mid;
    } else {
      high = mid - 1;
    }
  }

  return low;
};

const throughputs = [4, 2, 6];
const scalingCosts = [3, 5, 1];
const budget = 10;

const result = maxThroughput(throughputs, scalingCosts, budget);
console.log(result);
