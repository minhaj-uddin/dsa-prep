const reverseList = require("././reverse_stackified");

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

const arrayToList = (arr) => {
  if (arr.length === 0) return null;

  let head = new ListNode(arr[0]);
  let current = head;

  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }

  return head;
};

const listToArray = (head) => {
  let result = [];
  let current = head;

  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }

  return result;
};

const input = [1, 2, 3, 4, 5];
const head = arrayToList(input);
const reversed = reverseList(head);
const output = listToArray(reversed);

console.log(`Input: ${JSON.stringify(input)}`);
console.log(`Output: ${JSON.stringify(output)}`);
