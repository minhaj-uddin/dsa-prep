const maxPairs = (skills, minDiff) => {
  // Sort skills in ascending order
  skills.sort((a, b) => a - b);

  let p1 = 0; // pointer for lower skill
  let p2 = 1; // pointer for higher skill

  let pairs = 0;
  const n = skills.length;

  while (p1 < n && p2 < n) {
    if (skills[p2] - skills[p1] >= minDiff) {
      pairs++;
      p1++;
      p2++;
    } else {
      p2++;
    }
  }

  return pairs;
};

const minDiff = 4;
const skills = [1, 3, 5, 9];
const result = maxPairs(skills, minDiff);
console.log(result);
