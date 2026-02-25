// Recursive approach
const isSameTree = (r1, r2) => {
  if (!r1 && !r2) return true;
  if (!r1 || !r2) return false;
  if (r1.val !== r2.val) return false;

  const left = isSameTree(r1.left, r2.left);
  const right = isSameTree(r1.right, r2.right);
  return left && right;
};

// Iterative approach
const isSameTree2 = (p, q) => {
  const stack = [[p, q]];

  while (stack.length) {
    const [r1, r2] = stack.pop();

    if (!r1 && !r2) continue;
    if (!r1 || !r2) return false;
    if (r1.val !== r2.val) return false;

    stack.push([r1.left, r2.left]);
    stack.push([r1.right, r2.right]);
  }

  return true;
};
