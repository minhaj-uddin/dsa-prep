function highestValuePalindrome(s, k) {
  const n = s.length;
  let arr = s.split("");
  let changed = Array(n).fill(false);
  let required = 0;

  // Phase 1: Make palindrome with minimum changes
  let left = 0;
  let right = n - 1;
  while (left < right) {
    if (arr[left] !== arr[right]) {
      let maxChar = Math.max(arr[left], arr[right]);
      arr[left] = arr[right] = String(maxChar);
      changed[left] = changed[right] = true;
      required++;
    }
    left++;
    right--;
  }

  if (required > k) return "-1";

  let remaining = k - required;

  // Phase 2: Maximize palindrome
  left = 0;
  right = n - 1;
  while (left < right) {
    if (arr[left] !== "9") {
      if (changed[left] || changed[right]) {
        if (remaining >= 1) {
          arr[left] = arr[right] = "9";
          remaining--;
        }
      } else if (remaining >= 2) {
        arr[left] = arr[right] = "9";
        remaining -= 2;
      }
    }
    left++;
    right--;
  }

  // Middle digit for odd length
  if (n % 2 === 1 && remaining > 0) {
    arr[Math.floor(n / 2)] = "9";
  }

  return arr.join("");
}

const k = 2;
const s = "3943";
const result = highestValuePalindrome(s, k);
console.log(result);
