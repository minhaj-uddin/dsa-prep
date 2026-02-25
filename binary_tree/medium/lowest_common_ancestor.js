// Iterative Solution
const lowestCommonAncestor = (root, p, q) => {
  const min = Math.min(p.val, q.val);
  const max = Math.max(p.val, q.val);

  while (root) {
    if (root.val > max) {
      root = root.left;
    } else if (root.val < min) {
      root = root.right;
    } else {
      return root;
    }
  }

  return null;
};

// Recursive Solution
const lowestCommonAncestor2 = (root, p, q) => {
  if (!root) return null;

  if (root.val > Math.max(p.val, q.val)) {
    return lowestCommonAncestor2(root.left, p, q);
  }

  if (root.val < Math.min(p.val, q.val)) {
    return lowestCommonAncestor2(root.right, p, q);
  }

  return root;
};
