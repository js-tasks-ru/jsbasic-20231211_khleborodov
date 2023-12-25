function camelize(str) {
  let strArray = str.split('-');
  let changedStrArray = strArray.map((item, index) => (index === 0) ? item : item[0].toUpperCase() + item.slice(1));
  str = changedStrArray.join('');
  return str;
}
