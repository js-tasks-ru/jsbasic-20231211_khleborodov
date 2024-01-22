import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.spanNumber();
    this.stepLengthPercent = 100/(this.steps - 1);
    this.render();
  }
  
  spanNumber() {
    let span = '';
    for (let i = 0; i < this.steps; i++) {
      span += '<span></span>';
    }
    
    return span;
  }
  
  render() {
    this.elem = createElement(`
    <div class="slider">
      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress"></div>
      <div class="slider__steps">
        ${this.spanNumber()}
      </div>
    </div>`);
    
    this.elem.querySelector(".slider__steps").children[this.value].classList.add("slider__step-active");
    this.elem.querySelector('.slider__progress').style.width = 0 + '%';
    
    this.elem.addEventListener('click', (event) => {
      let sliderCoordinates = this.elem.getBoundingClientRect();
      let sliderLeft = sliderCoordinates.left;
      let sliderWidth = sliderCoordinates.width;
      
      let eventX = event.clientX;
      let eventXPercent = (eventX - sliderLeft) / sliderWidth * 100;
      this.value = Math.round(eventXPercent / this.stepLengthPercent);
      
      this.elem.querySelector(".slider__value").textContent = this.value;
      this.elem.querySelector(".slider__steps").children[this.value].classList.add("slider__step-active");
      this.elem.querySelector('.slider__thumb').style.left = this.value * this.stepLengthPercent + "%";
      this.elem.querySelector('.slider__progress').style.width = this.value * this.stepLengthPercent + "%";
      
      let sliderChangeEvent = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true,
        cancelable: true
      });
      
      this.elem.dispatchEvent(sliderChangeEvent);
    });
    
    let thumb = this.elem.querySelector(".slider__thumb");
    thumb.ondragstart = (event) => {
      event.preventDefault();
    }
    
    this.elem.onpointerdown = (event) => {
      event.preventDefault();
      document.addEventListener('pointermove', this.onPointerMove);
      document.addEventListener('pointerup', this.onPointerUp, {
        once: true
      });
      this.elem.classList.add('slider_dragging');
    }
    
    return this.elem;
  }
  
  onPointerMove = (event) => {
    event.preventDefault();
    let sliderCoordinates = this.elem.getBoundingClientRect();
    let sliderLeft = sliderCoordinates.left;
    let sliderWidth = sliderCoordinates.width;
    
    let eventX = event.clientX;
    let eventXPercent = (eventX - sliderLeft) / sliderWidth * 100;
    if (eventXPercent > 100) {
      eventXPercent = 100;
    } else if (eventXPercent < 0) {
      eventXPercent = 0;
    }
    
    this.value = Math.round(eventXPercent / this.stepLengthPercent);
    
    this.elem.querySelector('.slider__thumb').style.left = eventXPercent + "%";
    this.elem.querySelector('.slider__progress').style.width = eventXPercent + "%";
    this.elem.querySelector(".slider__value").textContent = this.value;
    this.elem.querySelector(".slider__step-active").classList.remove("slider__step-active");
    this.elem.querySelector(".slider__steps").children[this.value].classList.add("slider__step-active");
  }
  
  onPointerUp = () => {
    this.elem.querySelector('.slider__thumb').style.left = this.value * this.stepLengthPercent + "%";
    this.elem.querySelector('.slider__progress').style.width = this.value * this.stepLengthPercent + "%";
    document.removeEventListener('pointermove', this.onPointerMove);
    this.elem.classList.remove('slider_dragging');
    let changeSliderEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true,
      cancelable: true
    })
    this.elem.dispatchEvent(changeSliderEvent);
  }
}
