const maxBitwiseAnd = (N, K) => {
  const candidate = K - 1;

  if ((candidate | K) <= N) {
    return candidate;
  } else {
    return candidate - 1;
  }
};

const N = 8;
const K = 5;
const result = maxBitwiseAnd(N, K);
console.log(result);
