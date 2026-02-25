const shortestJobFirst = (tasks) => {
  if (!tasks || tasks.length === 1) return 0;

  tasks.sort((a, b) => a - b);

  let waitTime = 0;
  let totalTime = 0;

  for (let i = 0; i < tasks.length; i++) {
    waitTime += totalTime;
    totalTime += tasks[i];
  }

  return Math.floor(waitTime / tasks.length);
};

const tasks = [4, 3, 7, 1, 2];
const result = shortestJobFirst(tasks);
console.log(result);
