const canFinish = (n, prerequisites) => {
  const inDegree = new Array(n).fill(0);
  const adjList = inDegree.map(() => []);

  for (let i = 0; i < prerequisites.length; i++) {
    const pair = prerequisites[i];
    adjList[pair[1]].push(pair[0]);
    inDegree[pair[0]]++;
  }

  const stack = [];
  for (let i = 0; i < inDegree.length; i++) {
    if (inDegree[i] === 0) {
      stack.push(i);
    }
  }

  let count = 0;
  while (stack.length) {
    const current = stack.pop();
    count++; // Increment counter

    const adjacent = adjList[current];
    for (let i = 0; i < adjacent.length; i++) {
      const next = adjacent[i];
      inDegree[next]--;

      if (inDegree[next] === 0) {
        stack.push(next);
      }
    }
  }

  return count === n;
};

const n = 6;
const prereqs = [
  [1, 0],
  [2, 1],
  [2, 5],
  [0, 3],
  [4, 3],
  [3, 5],
  [4, 5],
];

const result = canFinish(n, prereqs);
console.log(result);
