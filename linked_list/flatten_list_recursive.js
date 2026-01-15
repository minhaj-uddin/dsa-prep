const flattenList = (head) => {
  let current = head;
  let last = null;

  while (current) {
    let next = current.next;

    if (current.child) {
      let tail = flattenList(current.child);

      current.next = current.child;
      current.child.prev = current;
      current.child = null;

      if (next) {
        tail.next = next;
        next.prev = tail;
      }

      last = tail;
    } else {
      last = current;
    }

    current = next;
  }

  return last;
};
