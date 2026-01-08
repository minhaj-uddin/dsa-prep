const bestTimeToSell = (prices) => {
  if (!prices.length || prices.length === 1) return 0;

  let leftPointer = 0;
  let rightPointer = leftPointer + 1;
  let maxProfit = 0;
  let profit = 0;

  while (leftPointer < prices.length - 1) {
    if (prices[leftPointer] < prices[rightPointer]) {
      profit = prices[rightPointer] - prices[leftPointer];
      maxProfit = Math.max(profit, maxProfit);
      rightPointer++;
    }

    if (
      prices[leftPointer] > prices[rightPointer] ||
      rightPointer === prices.length
    ) {
      leftPointer++;
      rightPointer = leftPointer + 1;
    }
  }

  return maxProfit;
};

const prices = [7, 1, 5, 3, 6, 4];
const result = bestTimeToSell(prices);
console.log(result);
