import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    const {name, price, cathegory, image, id} = product;
    
    this._elem = createElement(
      ` <div class="card">
            <div class="card__top">
                <img src="/assets/images/products/${image}" class="card__image" alt="product">
                <span class="card__price">€${price.toFixed(2)}</span>
            </div>
            <div class="card__body">
                <div class="card__title">${name}</div>
                <button type="button" class="card__button">
                    <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
            </div>
        </div>`);
    
    document.body.appendChild(this._elem);
    
    this._elem.addEventListener('click', (event) => {
      let cardBtn = this._elem.querySelector('.card__button');
      let myEvent = new CustomEvent("product-add", {
        detail: id,
        bubbles: true,
        cancelable: true
      });
      
      cardBtn.dispatchEvent(myEvent);
    });
    
    this._elem.addEventListener('product-add', (event) => {
      console.log('Продукт добавлен в корзину', event.detail);
    });
  }
  
  get elem() {
    return this._elem;
  }
}