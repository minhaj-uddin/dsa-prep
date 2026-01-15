class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

const mergeKLists = (lists) => {
  const k = lists.length;
  if (k === 0) return null;
  if (k === 1) return lists[0];

  for (let interval = 1; interval < k; interval *= 2) {
    for (let i = 0; i + interval < k; i += interval * 2) {
      lists[i] = mergeTwoLists(lists[i], lists[i + interval]);
    }
  }

  return lists[0];
};

const mergeTwoLists = (list1, list2) => {
  if (!list1) return list2;
  if (!list2) return list1;

  const dummy = new ListNode(0);
  let head = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      head.next = list1;
      list1 = list1.next;
    } else {
      head.next = list2;
      list2 = list2.next;
    }
    head = head.next;
  }

  head.next = list1 || list2;
  return dummy.next;
};
