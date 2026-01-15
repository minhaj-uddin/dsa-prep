function detectCycle(head) {
  if (!head || !head.next) return null;

  let slow = head;
  let fast = head;

  // Phase 1: Detect cycle
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      // Phase 2: Find cycle start
      let start = head;

      while (start !== slow) {
        slow = slow.next;
        start = start.next;
      }

      return start;
    }
  }

  return null;
}
