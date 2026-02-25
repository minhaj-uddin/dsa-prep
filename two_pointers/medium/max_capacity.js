const maxCapacity = (costs, capacity, budget) => {
  const n = costs.length;
  const machines = [];

  for (let i = 0; i < n; i++) {
    machines.push([costs[i], capacity[i]]);
  }

  // Sort machines by cost - Ascending
  machines.sort((a, b) => a[0] - b[0]);

  let maxCapacity = 0;

  // Case 1: Single machine
  for (let i = 0; i < n; i++) {
    if (machines[i][0] < budget) {
      maxCapacity = Math.max(maxCapacity, machines[i][1]);
    }
  }

  // Case 2: Multiple machines (two pointers)
  let left = 0;
  let right = n - 1;

  while (left < right) {
    const totalCost = machines[left][0] + machines[right][0];

    if (totalCost < budget) {
      const totalCapacity = machines[left][1] + machines[right][1];
      maxCapacity = Math.max(maxCapacity, totalCapacity);
      left++; // Try to increase capacity
    } else {
      right--; // Try to decrease cost
    }
  }

  return maxCapacity;
};

const costs = [3, 5, 2, 8];
const capacity = [4, 2, 3, 5];
const budget = 10;
const result = maxCapacity(costs, capacity, budget);
console.log(result);
