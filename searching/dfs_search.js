const traversalDFS = (graph) => {
  const vertex = 0;
  const values = [];
  const visited = {};

  dfs(graph, vertex, values, visited);
  return values;
};

const dfs = (graph, vertex, values, visited) => {
  values.push(vertex);
  visited[vertex] = true;

  const connections = graph[vertex];
  for (let i = 0; i < connections.length; i++) {
    const connection = connections[i];
    if (!visited[connection]) {
      dfs(graph, connection, values, visited);
    }
  }
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

const result = traversalDFS(adjList);
console.log(result);
