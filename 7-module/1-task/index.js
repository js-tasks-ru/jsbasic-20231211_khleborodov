import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render(categories);
    this.selectCategory();
  }
  
  render(categories) {
    let menu = createElement(`
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">
        ${this.getMenuList(categories)}
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>`);
    
    let arrowRightBtn = menu.querySelector(".ribbon__arrow_right");
    let arrowLeftBtn = menu.querySelector(".ribbon__arrow_left");
    let ribbonInner = menu.querySelector('.ribbon__inner');
    
    menu.addEventListener('click', event => {
      if (event.target.closest('.ribbon__arrow_right')) {
        ribbonInner.scrollBy(350, 0);
        ribbonInner.addEventListener('scroll', function () {
          let scrollRight = ribbonInner.scrollWidth - ribbonInner.scrollLeft - ribbonInner.clientWidth;
          
          if (scrollRight >= 1) {
            arrowLeftBtn.classList.add('ribbon__arrow_visible');
          } else {
            arrowRightBtn.classList.remove('ribbon__arrow_visible');
          }
        });
      }
      
      if (event.target.closest('.ribbon__arrow_left')) {
        ribbonInner.scrollBy(-350, 0);
        ribbonInner.addEventListener('scroll', function () {
          let scrollLeft = ribbonInner.scrollLeft;
          
          if (scrollLeft !== 0) {
          arrowRightBtn.classList.add('ribbon__arrow_visible');
        } else {
          arrowLeftBtn.classList.remove('ribbon__arrow_visible');
        }
        });
      }
    });
    
    return menu;
  }
  
  getMenuList(categories) {
    return categories.reduce((list, item) => {
      return list + `
      <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`
    }, '');
  }
  
  selectCategory() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const ribbonItem = Array.from(this.elem.querySelectorAll('.ribbon__item'));
    
    ribbonInner.addEventListener('click', (event) => {
      event.preventDefault();
      ribbonItem.forEach(item => {
        item.classList.remove('ribbon__item_active');
      });
      
      event.target.classList.add('ribbon__item_active');
      
      let ribbonSelectEvent = new CustomEvent("ribbon-select", {
        detail: event.target.dataset.id,
        bubbles: true,
        cancelable: true
      });
      
      this.elem.dispatchEvent(ribbonSelectEvent);
    })
  }
}
