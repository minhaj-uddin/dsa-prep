class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

const mergeTwoLists = (list1, list2) => {
  let head = new ListNode(0);
  let current = head;

  while (list1 && list2) {
    if (list1.val < list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  // Append any remaining nodes
  current.next = list1 || list2;

  return head.next;
};

const buildList = (arr) => {
  let head = null;
  let tail = null;

  for (const val of arr) {
    const node = new ListNode(val);

    if (!head) {
      head = node;
      tail = node;
    } else {
      tail.next = node;
      tail = node;
    }
  }

  return head;
};

const printList = (head) => {
  const result = [];
  let curr = head;

  while (curr) {
    result.push(curr.val);
    curr = curr.next;
  }

  console.log(result.join(" → "));
};

// Input lists
const list1 = buildList([1, 3, 5, 7, 9]);
const list2 = buildList([1, 2, 4, 6, 8]);

console.log("List 1:");
printList(list1);

console.log("List 2:");
printList(list2);

// Merge two lists
const merged = mergeTwoLists(list1, list2);

console.log("Merged List:");
printList(merged);
