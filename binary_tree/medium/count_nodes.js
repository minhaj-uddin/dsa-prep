// Recursive approach: O(n)
const countNodes = (root) => {
  if (!root) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
};

// Iterative approach: O(n)
const countNodes2 = (root) => {
  if (!root) return 0;

  let count = 0;
  const stack = [root];

  while (stack.length) {
    const node = stack.pop();
    count++;

    if (node.right) stack.append(node.right);
    if (node.left) stack.append(node.left);
  }

  return count;
};

// Optimized approach: O(Log^2 n)
const countNodes3 = (root) => {
  if (!root) return 0;

  const height = getTreeHeight(root);
  if (height === 0) return 1;

  const upperCount = Math.pow(2, height) - 1;
  let left = 0;
  let right = upperCount;

  while (left < right) {
    let index = Math.ceil((left + right) / 2);
    if (nodeExists(index, height, root)) {
      left = index;
    } else {
      right = index - 1;
    }
  }

  return upperCount + left + 1;
};

const getTreeHeight = (node) => {
  let height = 0;
  while (node.left) {
    height++;
    node = node.left;
  }
  return height;
};

const nodeExists = (index, height, node) => {
  let left = 0;
  let right = Math.pow(2, height) - 1;
  let count = 0;

  while (count < height) {
    const midOfNode = Math.ceil((left + right) / 2);
    if (index >= midOfNode) {
      node = node.right;
      left = midOfNode;
    } else {
      node = node.left;
      right = midOfNode - 1;
    }
    count++;
  }

  return node !== null;
};

// Optimized approach: O(Log^2 n)
const countNodes4 = (root) => {
  if (root === null) return 0;

  const getHeight = (node) => {
    let height = 0;
    while (node) {
      height++;
      node = node.left;
    }
    return height;
  };

  const leftHeight = getHeight(root.left);
  const rightHeight = getHeight(root.right);

  if (leftHeight === rightHeight) {
    return (1 << leftHeight) - 1;
    //return (1 << leftHeight) + countNodes2(root.right);
  }

  return (1 << rightHeight) + countNodes4(root.left);
};
