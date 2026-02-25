const fractionalKnapsack = (capacity, items) => {
  // Sort items by value-to-weight ratio (descending order)
  items.sort((a, b) => b.value / b.weight - a.value / a.weight);

  let totalValue = 0;

  for (const item of items) {
    if (capacity <= 0) break;

    if (item.weight <= capacity) {
      // Take full item
      totalValue += item.value;
      capacity -= item.weight;
    } else {
      // Take fractional part
      totalValue += (item.value / item.weight) * capacity;
      break; // Knapsack is full
    }
  }

  return totalValue;
};

class Item {
  constructor(value, weight) {
    this.value = value;
    this.weight = weight;
  }
}

const capacity = 50;
const items = [new Item(60, 10), new Item(100, 20), new Item(120, 30)];
console.log(fractionalKnapsack(capacity, items));
