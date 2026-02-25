const caesarCipher = (text, shift) => {
  const A = "A".charCodeAt(0);
  const Z = "Z".charCodeAt(0);
  const a = "a".charCodeAt(0);
  const z = "z".charCodeAt(0);
  const SIZE = 26;

  // Normalize shift (handles negatives)
  shift = ((shift % SIZE) + SIZE) % SIZE;

  return [...text]
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= A && code <= Z)
        return String.fromCharCode(((code - A + shift) % SIZE) + A);
      if (code >= a && code <= z)
        return String.fromCharCode(((code - a + shift) % SIZE) + a);
      return c;
    })
    .join("");
};

const shift = 5;
const text = "Happy Coding!";
const encrypted = caesarCipher(text, shift);
console.log(encrypted);
const decrypted = caesarCipher(encrypted, -shift);
console.log(decrypted);
