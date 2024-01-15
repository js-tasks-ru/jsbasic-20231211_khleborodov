/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = this.render(rows);
  }

  render(rows) {
    const table = document.createElement('table');
    table.insertAdjacentHTML('beforeEnd', `
    <thead>
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    </tbody>`);
    
    const tbody = table.querySelector('tbody');
    for (const {name, age, salary, city} of rows) {
      tbody.insertAdjacentHTML('beforeEnd', `
      <tr>
        <td>${name}</td>
        <td>${age}</td>
        <td>${salary}</td>
        <td>${city}</td>
        <td><button>X</button>
        </td>
      </tr>`);
    }
    
    tbody.addEventListener('click', (event) => {
      if (event.target.matches('button')) {
        let deletableElem = event.target.closest('tr');
        deletableElem.remove();
      }
    });

    return table;
  }
}
