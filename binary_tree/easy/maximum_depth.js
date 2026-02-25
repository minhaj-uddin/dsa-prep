// Recursive approach
const maxDepth = (root) => {
  if (!root) return 0;

  const left = maxDepth(root.left);
  const right = maxDepth(root.right);
  return 1 + Math.max(left, right);
};

// Recursive approach - Parametric
const maxDepth2 = (root, count) => {
  if (!root) return count;
  count++; // Increment count for each level
  return Math.max(maxDepth2(root.left, count), maxDepth2(root.right, count));
};

// Iterative approach
const maxDepth3 = (root) => {
  if (!root) return 0;

  let depth = 0;
  const queue = [root];

  while (queue.length) {
    let size = queue.length;
    while (size--) {
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    depth++;
  }

  return depth;
};
