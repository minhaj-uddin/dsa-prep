// Recursive approach
const invertTree = (root) => {
  if (!root) return null;

  const left = invertTree(root.left);
  const right = invertTree(root.right);

  root.left = right;
  root.right = left;

  return root;
};

// Iterative approach
const invertTree2 = (root) => {
  if (!root) return null;

  const queue = [root];

  while (queue.length) {
    const node = queue.shift();
    [node.left, node.right] = [node.right, node.left];

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return root;
};
