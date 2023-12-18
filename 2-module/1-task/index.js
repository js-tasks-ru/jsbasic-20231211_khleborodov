function sumSalary(salaries) {
  let sum = 0;
  for (let property in salaries) {
    if (Number.isFinite(salaries[property])) {
      sum += salaries[property];
    }
  }
  
  return sum;
}
