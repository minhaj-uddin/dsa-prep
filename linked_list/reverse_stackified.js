const reverseList = (head) => {
  let stack = [];
  let current = head;

  // Push all nodes into stack
  while (current !== null) {
    stack.push(current);
    current = current.next;
  }

  // Make the last node as new head of the linked list
  if (stack.length > 0) {
    head = stack.pop();
    current = head;

    // Pop all the nodes and append to the linked list
    while (stack.length > 0) {
      current.next = stack.pop();
      current = current.next;
    }

    current.next = null;
  }

  return head;
};

module.exports = reverseList;
