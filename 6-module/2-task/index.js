import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.elem = this.render(product);
  }

  render(product) {
    let card = createElement(`
    <div class="card">
      <div class="card__top">
        <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
        <span class="card__price">€${product.price.toFixed(2)}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${product.name}</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>`);
    
    this.addEvent(card, product.id);
    return card;
  };
  
  addEvent(element, id) {
    let btn = element.querySelector('.card__button');
    btn.addEventListener('click', () => {
      let productAddEvent = new CustomEvent("product-add", {
      detail: id,
      bubbles: true,
      cancelable: true
      });
      btn.dispatchEvent(productAddEvent);
    });
  }
}