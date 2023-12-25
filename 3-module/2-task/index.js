function filterRange(arr, a, b) {
  let filteredArr = arr.filter(item => (a <= item) && (item <= b));
  return filteredArr;
}
