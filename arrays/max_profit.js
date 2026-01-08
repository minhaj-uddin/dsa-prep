const maxProfit = (prices) => {
  if (!prices.length || prices.length === 1) return 0;

  let left = 0;
  let profit = 0;

  for (let right = 1; right < prices.length; right++) {
    if (prices[left] < prices[right]) {
      profit = Math.max(profit, prices[right] - prices[left]);
    } else {
      left = right;
    }
  }

  return profit;
};

const prices = [7, 1, 5, 3, 6, 4];
const result = maxProfit(prices);
console.log(result);
