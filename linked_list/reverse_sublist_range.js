const reverseBetween = (head, m, n) => {
  if (!head || m == n) return head;

  let currentPosition = 1;
  let currentNode = head;
  let start = head;

  while (currentPosition < m) {
    start = currentNode;
    currentNode = currentNode.next;
    currentPosition++;
  }

  let newList = null;
  let tail = currentNode;

  while (currentPosition >= m && currentPosition <= n) {
    const next = currentNode.next;
    currentNode.next = newList;
    newList = currentNode;
    currentNode = next;
    currentPosition++;
  }

  start.next = newList;
  tail.next = currentNode;

  return m > 1 ? head : newList;
};

class ListNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

const buildList = (arr) => {
  let head = new ListNode(0);
  let currentNode = head;

  for (let num of arr) {
    currentNode.next = new ListNode(num);
    currentNode = currentNode.next;
  }

  return head.next;
};

const listToArray = (head) => {
  let result = [];
  while (head) {
    result.push(head.data);
    head = head.next;
  }
  return result;
};

const m = 2;
const n = 5;
const input = [10, 20, 30, 40, 50, 60, 70];
const head = buildList(input);

console.log(listToArray(head));
const reversed = reverseBetween(head, m, n);
console.log(listToArray(reversed));
