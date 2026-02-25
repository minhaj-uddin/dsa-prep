// Recursive Solution
const search = (root, key) => {
  if (!root) return false;

  if (root.val === key) return true;

  return root.val > key ? search(root.left, key) : search(root.right, key);
};

// Iterative Solution
const search2 = (root, key) => {
  let present = false;

  while (root !== null) {
    if (root.val === key) {
      present = true;
      break;
    } else if (root.val > key) {
      root = root.left;
    } else {
      root = root.right;
    }
  }

  return present;
};
