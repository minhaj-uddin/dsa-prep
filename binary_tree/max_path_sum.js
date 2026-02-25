const maxPathSum = (root) => {
  let maxSum = -Infinity;

  // Recursive helper function
  const result = dfs(root);
  console.log(result);

  return maxSum;
};

const dfs = (node) => {
  if (!node) return 0;

  const leftMax = Math.max(0, dfs(node.left));
  const rightMax = Math.max(0, dfs(node.right));

  const currentSum = node.val + leftMax + rightMax;
  maxSum = Math.max(maxSum, currentSum);

  return node.val + Math.max(leftMax, rightMax);
};
