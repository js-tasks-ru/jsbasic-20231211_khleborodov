function makeDiagonalRed(table) {
  const rows = Array.from(table.rows);
  let i = 0;
  
  outer:
  for (const row of rows) {
    const cellsArr = Array.from(row.cells);
    while (i <= cellsArr.length - 1) {
      const cell = cellsArr[i];
      cell.style.backgroundColor = 'red';
      if (i === cellsArr.length - 1) break;
      
      i++;
      continue outer;
    }
  }
}
