import createElement from '../../assets/lib/create-element.js';


export default class Carousel {
  constructor(slides) {
    this.counter = 0;
    this.slides = slides;
    this.elem = this.render(slides);
  }
  
  render(slides) {
    let carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left" style="display: none">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.getSlidesList(slides)}
        </div>
      </div>`
    );
    
    let arrowRight = carousel.querySelector(".carousel__arrow_right");
    let arrowLeft = carousel.querySelector(".carousel__arrow_left");

    this.setArrow(this.counter, arrowRight, arrowLeft, this.slides.length);
    
    arrowRight.addEventListener( "click", () => {
      let carouselInnerWidth = carousel.querySelector(".carousel__inner").offsetWidth;
      this.counter++;
      document.querySelector(".carousel__inner").style.transform = `translateX(-${this.counter * carouselInnerWidth}px)`;
      this.setArrow(this.counter, arrowRight, arrowLeft, this.slides.length);
    });
    
    arrowLeft.addEventListener( "click", () => {
      let carouselInnerWidth = carousel.querySelector(".carousel__inner").offsetWidth;
      this.counter--;
      document.querySelector(".carousel__inner").style.transform = `translateX(-${this.counter * carouselInnerWidth}px)`;
      this.setArrow(this.counter, arrowRight, arrowLeft, this.slides.length);
    });
    
    let buttons = Array.from(carousel.getElementsByClassName('carousel__button'));
    for (let button of buttons) {
      button.addEventListener('click', () => {
        let productAddEvent = new CustomEvent("product-add", {
          detail: button.closest('.carousel__slide').dataset.id,
          bubbles: true,
          cancelable: true
        });
        button.dispatchEvent(productAddEvent);
      });
    }
    
    return carousel;
  }
  
  getSlidesList(slides) {
    return slides.reduce((list, item) => {
      return list + `
        <div class="carousel__slide" data-id=${item.id}>
          <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${item.price.toFixed(2)}</span>
            <div class="carousel__title">${item.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>`;
      }, '');
  }

  setArrow(counter, arrowRight, arrowLeft, countSlide) {
    if (counter === 0) {
      arrowLeft.style.display = 'none';
    } else {
      arrowLeft.style.display = '';
    }

    if (counter === countSlide - 1) {
      arrowRight.style.display = 'none';
    } else {
      arrowRight.style.display = '';
    }
  }
}
