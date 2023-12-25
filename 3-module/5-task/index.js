function getMinMax(str) {
  let arr = str.split(' ');
  let filteredArr = arr.filter(item => !isNaN(item));
  let min = Math.min(...filteredArr);
  let max = Math.max(...filteredArr);
  let result = {
    min,
    max
  };

  return result;
}
