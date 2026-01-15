const detectCycle = (head) => {
  let currentNode = head;
  let visitedNodes = new Set();

  while (currentNode !== null) {
    if (visitedNodes.has(currentNode)) {
      return currentNode;
    }

    visitedNodes.add(currentNode);
    currentNode = currentNode.next;
  }

  return null;
};
