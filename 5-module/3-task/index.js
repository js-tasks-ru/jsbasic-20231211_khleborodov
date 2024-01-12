function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const carouselInner = carousel.querySelector('.carousel__inner');
  const carouselArrowLeft = carousel.querySelector('.carousel__arrow_left');
  const carouselArrowRight = carousel.querySelector('.carousel__arrow_right');
  const carouselSlides = Array.from(carouselInner.querySelectorAll('.carousel__slide'));
  
  let counter = 1;
  carouselArrowLeft.style.display = 'none';
  
  carousel.addEventListener('click', (event) => {
    const slideWidth = carouselSlides[counter].offsetWidth;

    if (event.target.closest('.carousel__arrow_right')) {
      carouselInner.setAttribute('style', `transform: translateX(${-slideWidth * counter}px)`);
      counter++;
      carouselArrowLeft.style.display = '';
      
      if (counter === carouselSlides.length) {
        carouselArrowRight.style.display = 'none';
        counter--;
      }
    }

    if (event.target.closest('.carousel__arrow_left')) {
      counter--;
      carouselInner.setAttribute('style', `transform: translateX(${-slideWidth * counter}px)`);
      carouselArrowRight.style.display = '';
      
      if (counter === 0) {
        carouselArrowLeft.style.display = 'none';
        counter++;
      }
    }
  });
}
