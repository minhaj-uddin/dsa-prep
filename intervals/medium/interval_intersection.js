const intervalIntersection = (firstList, secondList) => {
  if (firstList?.length === 0 || secondList?.length === 0) return [];

  let result = [];
  let p1 = 0;
  let p2 = 0;

  while (p1 < firstList.length && p2 < secondList.length) {
    const [s1, e1] = firstList[p1];
    const [s2, e2] = secondList[p2];

    // Intersection of two closed intervals
    const start = Math.max(s1, s2);
    const end = Math.min(e1, e2);

    // Add to result, only if overlap exists
    if (start <= end) result.push([start, end]);

    // Move pointer of interval with smaller end.
    e1 < e2 ? p1++ : p2++;
  }

  return result;
};

const firstList = [
  [0, 2],
  [5, 10],
  [13, 23],
  [24, 25],
];
const secondList = [
  [1, 5],
  [8, 12],
  [15, 24],
  [25, 26],
];

const result = intervalIntersection(firstList, secondList);
console.log(result);
