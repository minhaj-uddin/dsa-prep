// Greedy Approach: Dual Traversal
const candy2 = (candies) => {
  const n = candies.length;
  if (n === 0) return 0;

  let leftCandy = new Array(n).fill(1);
  let rightCandy = new Array(n).fill(1);

  // 1. Traversal: Left pass
  for (let i = 1; i < n; i++) {
    if (candies[i] > candies[i - 1]) {
      leftCandy[i] = leftCandy[i - 1] + 1;
    }
  }

  // 2. Traversal: Right pass
  for (let i = n - 2; i >= 0; i--) {
    if (candies[i] > candies[i + 1]) {
      rightCandy[i] = rightCandy[i + 1] + 1;
    }
  }

  // Calculate final answer
  let totalCandies = 0;
  for (let i = 0; i < n; i++) {
    totalCandies += Math.max(leftCandy[i], rightCandy[i]);
  }

  return totalCandies;
};

// Greedy Approach: Optimized Traversal
const candy3 = (ratings) => {
  const n = ratings.length;
  if (n === 0) return 0;

  const candies = new Array(n).fill(1);

  // Left → Right pass
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }

  // Right → Left pass + compute total
  let total = candies[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
    total += candies[i];
  }

  return total;
};

// Greedy Approach: Slope Method
const candy = (ratings) => {
  const n = ratings.length;
  if (n === 0) return 0;

  let total = 1;
  let up = 0;
  let down = 0;
  let peak = 0;

  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      up++;
      peak = up;
      down = 0;
      total += 1 + up;
    } else if (ratings[i] < ratings[i - 1]) {
      down++;
      up = 0;
      total += down;

      if (down > peak) {
        total += 1;
      }
    } else {
      up = down = peak = 0;
      total += 1;
    }
  }

  return total;
};

const candies = [1, 0, 2];
console.log(candy2(candies));
console.log(candy3(candies));
console.log(candy(candies));
