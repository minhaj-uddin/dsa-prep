const jobSequencing = (jobs) => {
  if (!jobs?.length) return [0, 0];

  // Sort by profit (descending)
  jobs.sort((a, b) => b.profit - a.profit);

  // Find maximum deadline
  const maxDeadline = Math.max(...jobs.map((job) => job.deadline));

  // Track occupied time slots (1-based index)
  const slots = Array(maxDeadline + 1).fill(false);

  let totalJobs = 0;
  let totalProfit = 0;

  for (const job of jobs) {
    // Try to schedule job at the latest possible slot
    for (let time = job.deadline; time > 0; time--) {
      if (!slots[time]) {
        slots[time] = true;
        totalJobs++;
        totalProfit += job.profit;
        break;
      }
    }
  }

  return [totalJobs, totalProfit];
};

class Job {
  constructor(id, deadline, profit) {
    this.id = id;
    this.deadline = deadline;
    this.profit = profit;
  }
}

const jobs1 = [
  new Job(1, 4, 20),
  new Job(2, 1, 10),
  new Job(3, 2, 40),
  new Job(4, 2, 30),
];

const jobs2 = [
  new Job(1, 2, 100),
  new Job(2, 1, 19),
  new Job(3, 2, 27),
  new Job(4, 1, 25),
  new Job(5, 1, 15),
];

console.log(jobSequencing(jobs1));
console.log(jobSequencing(jobs2));
