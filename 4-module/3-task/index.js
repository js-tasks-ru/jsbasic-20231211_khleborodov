function highlight(table) {
  const rows = Array.from(table.rows);
  for (const row of rows) {
    const cellsArr = Array.from(row.cells);
    const age = cellsArr[1];
    const gender = cellsArr[2];
    const status = cellsArr[3];

    if (Number(age.textContent) < 18) {
      row.style.textDecoration = 'line-through';
    }
    
    if (gender.textContent === 'm') {
      row.classList.add('male');
    }

    if (gender.textContent === 'f') {
      row.classList.add('female');
    }
    
    if (!status.dataset.available) {
      row.hidden = true;
    } else {
      row.hidden = false;
    }
    
    if (status.dataset.available === 'true') {
      row.classList.add('available');
    }
    
    if (status.dataset.available === 'false') {
      row.classList.add('unavailable');
    }
  }
}
