class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const buildTree = (preorder, inorder) => {
  if (!preorder.length || !inorder.length) return null;

  // Map value -> inorder index for O(1) lookup
  const indexMap = new Map();
  for (let i = 0; i < inorder.length; i++) {
    indexMap.set(inorder[i], i);
  }

  let preorderIndex = 0;

  const helper = (left, right) => {
    if (left > right) return null;

    // Pick root from preorder
    const rootValue = preorder[preorderIndex++];
    const root = new TreeNode(rootValue);

    // Split inorder range
    const mid = indexMap.get(rootValue);

    root.left = helper(left, mid - 1);
    root.right = helper(mid + 1, right);

    return root;
  };

  return helper(0, inorder.length - 1);
};

const preorder = [3, 9, 20, 15, 7];
const inorder = [9, 3, 15, 20, 7];
const root = buildTree(preorder, inorder);
console.log(root);
