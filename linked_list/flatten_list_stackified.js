function flattenList(head) {
  if (head === null) return head;

  const stack = [];
  let current = head;

  while (current !== null) {
    if (current.child !== null) {
      if (current.next !== null) {
        stack.push(current.next);
      }

      // Connect the child list to the current node
      current.next = current.child;
      current.child.prev = current;
      current.child = null;
    }

    if (current.next === null && stack.length > 0) {
      // Pop from stack and attach it to the end of the current list
      const next = stack.pop();
      current.next = next;
      next.prev = current;
    }

    current = current.next;
  }

  return head;
}
