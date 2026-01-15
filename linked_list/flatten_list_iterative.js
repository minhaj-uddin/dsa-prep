const flattenList = (head) => {
  if (!head) return head;

  let currentNode = head;
  while (currentNode) {
    if (!currentNode.child) {
      currentNode = currentNode.next;
    } else {
      let tailNode = currentNode.child;
      while (tailNode.next) {
        tailNode = tailNode.next;
      }

      tailNode.next = currentNode.next;
      if (tailNode.next) {
        tailNode.next.prev = tailNode;
      }

      currentNode.next = currentNode.child;
      currentNode.next.prev = currentNode;
      currentNode.child = null;
    }
  }

  return head;
};
