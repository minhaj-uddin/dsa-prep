const minimumSubstring = (source, target) => {
  if (!source || !target) return "";
  if (source.length < target.length) return "";

  const targetMap = new Map();
  const sourceMap = new Map();

  for (let i = 0; i < target.length; i++) {
    targetMap.set(target[i], targetMap.get(target[i]) + 1 || 1);
  }

  const required = target.length;
  let minLength = Infinity;
  let lIndex = -1;
  let rIndex = -1;
  let count = 0;

  let left = 0;
  for (let right = 0; right < source.length; right++) {
    const current = source[right];
    sourceMap.set(current, (sourceMap.get(current) || 0) + 1);

    if (
      targetMap.has(current) &&
      sourceMap.get(current) === targetMap.get(current)
    ) {
      // Increment count
      count++;
    }

    while (count === required) {
      // Compare minimum length
      if (minLength > right - left + 1) {
        minLength = right - left + 1;
        lIndex = left;
        rIndex = right;
      }

      // Decrement source-map
      sourceMap.set(source[left], sourceMap.get(source[left]) - 1);

      if (
        targetMap.has(source[left]) &&
        targetMap.get(source[left]) > sourceMap.get(source[left])
      ) {
        // Decrement count
        count--;
      }

      // Increment left
      left++;
    }
  }

  return source.substring(lIndex, rIndex + 1);
};

const target = "ABC";
const source = "ADOBECODEBANC";
const result = minimumSubstring(source, target);
console.log(result);
