const reverseList = (head) => {
  if (!head || !head.next) return head;

  // Reverse the rest of linked list
  let newHead = reverseList(head.next);

  // Make the current head as last node of remaining linked list
  head.next.next = head;

  // Update next of current head to null
  head.next = null;

  return newHead;
};
