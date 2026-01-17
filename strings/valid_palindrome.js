const isPalindrome = (s) => {
  if (!s.length) return true;

  let p1 = 0;
  let p2 = s.length - 1;

  while (p1 <= p2) {
    if (isSpecialCharacter(s[p1])) p1++;
    else if (isSpecialCharacter(s[p2])) p2--;
    else {
      if (s[p1].toLowerCase() !== s[p2].toLowerCase()) {
        return false;
      }
      p1++;
      p2--;
    }
  }

  return true;
};

const isSpecialCharacter = (c) => {
  const list = [",", ".", " ", ":", "!"];
  return list.includes(c);
};

const input = "A man, a plan, a canal: Panama";
const result = isPalindrome(input);
console.log(result);
