function truncate(str, maxlength) {
  let truncatedString = '';
  if (str.length <= maxlength) return str;
  
  truncatedString += (str.slice(0, maxlength - 1) + "…");
  return truncatedString;
}
