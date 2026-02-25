const zigZagView = (root) => {
  if (!root) return [];

  const result = [];
  const queue = [root];
  let leftToRight = true;

  while (queue.length) {
    const qSize = queue.length;
    const level = [];

    for (let i = 0; i < qSize; i++) {
      const node = queue.shift();

      if (leftToRight) {
        level.push(node.val);
      } else {
        level.unshift(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
    leftToRight = !leftToRight;
  }

  return result;
};
