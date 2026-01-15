class ListNode {
  constructor(val, next) {
    this.val = val ?? 0;
    this.next = next ?? null;
  }
}

const reorderList = (head) => {
  if (!head || !head.next) return;

  // Step 1: Find the middle of the linked list using two pointers
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Step 2: Reverse the second half of the linked list
  let secondHalf = slow.next;

  // Disconnect first half from second half
  slow.next = null;

  let reversed = null;
  while (secondHalf) {
    const nextNode = secondHalf.next;
    secondHalf.next = reversed;
    reversed = secondHalf;
    secondHalf = nextNode;
  }

  // Step 3: Merge the two halves by alternating nodes
  let first = head;
  let second = reversed;

  while (second) {
    // Save next nodes
    const temp1 = first.next;
    const temp2 = second.next;

    // Interleave nodes
    first.next = second;
    second.next = temp1;

    // Move pointers forward
    first = temp1;
    second = temp2;
  }
};

//////////////////////////////////////////
// ---------- Helper Functions ----------
//////////////////////////////////////////

// Convert array -> linked list
function buildList(arr) {
  if (arr.length === 0) return null;

  let head = new ListNode(arr[0]);
  let curr = head;

  for (let i = 1; i < arr.length; i++) {
    curr.next = new ListNode(arr[i]);
    curr = curr.next;
  }
  return head;
}

// Print linked list
function printList(head) {
  let result = [];
  while (head) {
    result.push(head.val);
    head = head.next;
  }
  console.log(result.join(" -> "));
}

// ---------- Inline Inputs ----------
const testCases = [
  [],
  [1],
  [1, 2],
  [1, 2, 3],
  [1, 2, 3, 4],
  [1, 2, 3, 4, 5],
  [10, 20, 30, 40, 50, 60],
];

// ---------- Run Tests ----------
testCases.forEach((input, index) => {
  console.log(`\nTest Case ${index + 1}`);
  console.log("Input :", input);

  let head = buildList(input);
  reorderList(head);

  process.stdout.write("Output: ");
  printList(head);
});
