const levelOrder = (root) => {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const qSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < qSize; i++) {
      const current = queue.shift();
      currentLevel.push(current.val);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    result.push(currentLevel);
  }

  return result;
};
