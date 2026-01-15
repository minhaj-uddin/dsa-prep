const reverseList = (head) => {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    // Save next node
    let next = curr.next;

    // Reverse pointer
    curr.next = prev;

    // Move forward
    prev = curr;
    curr = next;
  }

  return prev;
};
