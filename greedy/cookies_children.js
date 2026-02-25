const findContentChildren = (g, s) => {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);

  let childIndex = 0;
  let cookieIndex = 0;

  while (childIndex < g.length && cookieIndex < s.length) {
    if (s[cookieIndex] >= g[childIndex]) {
      childIndex++;
    }
    cookieIndex++;
  }

  return childIndex;
};

const g = [1, 5, 3, 3, 4];
const s = [4, 2, 1, 2, 1, 3];
const result = findContentChildren(g, s);
console.log(result);
