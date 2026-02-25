const insertIntoHeap = (nodeValue) => {
  if (nodeValue) heap.push(nodeValue);

  let nodeIndex = heap.length - 1;
  let parentIndex = Math.floor((heap.length - 1) / 2);

  while (heap[nodeIndex] > heap[parentIndex]) {
    swapNodeValues(nodeIndex, parentIndex);

    nodeIndex = parentIndex;
    parentIndex = Math.floor((parentIndex - 1) / 2);
  }
};

const swapNodeValues = (nodeIndex, parentIndex) => {
  let tempValue = heap[parentIndex];
  heap[parentIndex] = heap[nodeIndex];
  heap[nodeIndex] = tempValue;
};

const removeFromHeap = () => {
  heap[0] = heap[heap.length - 1];
  heap = heap.slice(0, -1);

  let parentIndex = 0;
  let leftChild = parentIndex * 2 + 1;
  let rightChild = parentIndex * 2 + 2;

  let nodeIndex = heap[leftChild] > heap[rightChild] ? leftChild : rightChild;

  while (heap[parentIndex] < heap[nodeIndex]) {
    swapNodeValues(nodeIndex, parentIndex);

    parentIndex = nodeIndex;
    leftChild = parentIndex * 2 + 1;
    rightChild = parentIndex * 2 + 2;

    nodeIndex = heap[leftChild] > heap[rightChild] ? leftChild : rightChild;
  }
};

const printHeap = () => {
  console.log(heap);
};

const inputToInsert = 66;
let heap = [50, 40, 25, 20, 35, 10, 15];

insertIntoHeap(inputToInsert);
insertIntoHeap((nodeValue = 75));
printHeap();

removeFromHeap();
printHeap();
