const traversalBFS = (graph) => {
  const queue = [0];
  const values = [];
  const visited = {};

  while (queue.length) {
    const vertex = queue.shift();
    values.push(vertex);
    visited[vertex] = true;

    const connections = graph[vertex];
    for (let i = 0; i < connections.length; i++) {
      const connection = connections[i];

      if (!visited[connection]) {
        queue.push(connection);
      }
    }
  }

  return values;
};

const adjList = [
  [1, 3],
  [0],
  [3, 8],
  [0, 4, 5, 2],
  [3, 6],
  [3],
  [4, 7],
  [6],
  [2],
];

const result = traversalBFS(adjList);
console.log(result);
