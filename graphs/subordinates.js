const numOfMinutes = (empCount, headId, managers, informTime) => {
  const adjList = managers.map(() => []);

  for (let e = 0; e < empCount; e++) {
    const manager = managers[e];
    if (manager === -1) continue;
    adjList[manager].push(e);
  }

  return dfs(headId, adjList, informTime);
};

const dfs = (currentId, adjList, informTime) => {
  if (adjList[currentId].length === 0) return 0;

  let max = 0;
  const subordinates = adjList[currentId];

  for (let i = 0; i < subordinates.length; i++) {
    max = Math.max(max, dfs(subordinates[i], adjList, informTime));
  }

  return max + informTime[currentId];
};

const headId = 4;
const empCount = 8;
const managers = [2, 2, 4, 6, -1, 4, 4, 5];
const informTime = [0, 0, 4, 0, 7, 3, 6, 0];

const result = numOfMinutes(empCount, headId, managers, informTime);
console.log(result);
