export function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function shuffle(array) {
  const arrCopy = [...array];
  let copy = [], n = array.length, i;

  // While there remain elements to shuffle…
  while (n) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * array.length);

    // If not already shuffled, move it to the new array.
    if (i in arrCopy) {
      copy.push(arrCopy[i]);
      delete arrCopy[i];
      n--;
    }
  }

  return copy;
}