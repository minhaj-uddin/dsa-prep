const findPlatform = (arr, dep) => {
  if (!arr?.length || !dep?.length) return 0;

  arr.sort((a, b) => a - b);
  dep.sort((a, b) => a - b);

  let totalPlatforms = 0;
  let maxPlatforms = 0;
  let p1 = 0;
  let p2 = 0;

  while (p1 < arr.length) {
    if (arr[p1] < dep[p2]) {
      p1++;
      totalPlatforms++;
    } else {
      p2++;
      totalPlatforms--;
    }
    maxPlatforms = Math.max(maxPlatforms, totalPlatforms);
  }

  return maxPlatforms;
};

const arr = [900, 940, 950, 1100, 1500, 1800];
const dep = [910, 1200, 1120, 1130, 1900, 2000];
const result = findPlatform(arr, dep);
console.log(result);
