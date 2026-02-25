const isSubtree = (root, subRoot) => {
  // Main tree exhausted
  if (root === null) return false;

  // Empty subtree is always valid
  if (subRoot === null) return true;

  // If trees match at this node
  if (isSameTree(root, subRoot)) return true;

  // Otherwise, check left and right subtrees
  const left = isSubtree(root.left, subRoot);
  const right = isSubtree(root.right, subRoot);

  return left || right;
};

const isSameTree = (root1, root2) => {
  // Both null → identical
  if (root1 === null && root2 === null) return true;

  // One null, both are not identical
  if (root1 === null || root2 === null) return false;

  // Values (differ and) does not match
  if (root1.val !== root2.val) return false;

  // Recursively check left & right
  const left = isSameTree(root1.left, root2.left);
  const right = isSameTree(root1.right, root2.right);

  return left && right;
};

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildTree(arr) {
  if (!arr.length) return null;

  let root = new TreeNode(arr[0]);
  let queue = [root];
  let i = 1;

  while (i < arr.length) {
    let current = queue.shift();

    if (arr[i] !== null && arr[i] !== undefined) {
      current.left = new TreeNode(arr[i]);
      queue.push(current.left);
    }
    i++;

    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
      current.right = new TreeNode(arr[i]);
      queue.push(current.right);
    }
    i++;
  }

  return root;
}

const root = buildTree([3, 4, 5, 1, 2]);
const subRoot = buildTree([4, 1, 2]);

console.log(isSubtree(root, subRoot));
