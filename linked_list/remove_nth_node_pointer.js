class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

const removeNthFromEnd = (head, n) => {
  const dummy = new ListNode(0, head);
  let fast = dummy;
  let slow = dummy;

  // Move fast pointer n steps ahead
  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }

  // Move both pointers until fast reaches the end
  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }

  // Remove the nth node from the end
  slow.next = slow.next.next;

  return dummy.next;
};
