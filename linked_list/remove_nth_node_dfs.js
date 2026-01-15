class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

const removeNthFromEnd = (head, n) => {
  const newHead = new ListNode(0, head);
  dfs(newHead, n + 1);
  return newHead.next;
};

const dfs = (node, k) => {
  if (!node) return 0;

  const index = 1 + dfs(node.next, k);

  if (index === k) {
    node.next = node.next.next;
  }

  return index;
};
