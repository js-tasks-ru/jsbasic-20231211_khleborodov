function initCarousel() {
  const carouselInner = document.querySelector('.carousel__inner');
  const carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  const carouselArrowRight = document.querySelector('.carousel__arrow_right');
  const carouselImages = Array.from(document.querySelectorAll('.carousel__img'));
  
  function getTransformTranslateValue() {
    let value = '';
    let arr = carouselInner.style.transform.split('');
    arr.forEach(char => {
      if (Number(char)) {
        value += char;
      }
    });
    
    return value;
  }
  
  let index = 0;
  carouselArrowLeft.style.display = 'none';
  
  carouselArrowRight.addEventListener('click', () => {
    carouselArrowLeft.style.display = '';
    let previousTransformTranslateValue = 0;
    
    if (carouselInner.style.transform) {
      previousTransformTranslateValue = getTransformTranslateValue();
    }
    
    const carouselImageWidth = carouselImages[index].offsetWidth;
    carouselInner.style.transform = `translateX(${-Number(previousTransformTranslateValue) - carouselImageWidth}px)`;
    ++index;
    
    if (index === carouselImages.length - 1) {
      carouselArrowRight.style.display = 'none';
    }
  });
  
  carouselArrowLeft.addEventListener('click', () => {
    carouselArrowRight.style.display = '';
    let previousTransformTranslateValue = getTransformTranslateValue();
    const carouselImageWidth = carouselImages[index].offsetWidth;
    //С этим кодом все работает, но не проходит тест
    //carouselInner.style.transform = `translateX(${-Number(previousTransformTranslateValue) + carouselImageWidth}px)`;

    //С этим кодом проходит тест, но задание считается не выполненым
    carouselInner.style.transform = `translateX(${-Number(previousTransformTranslateValue) - carouselImageWidth + 55}px)`;
    --index;
    
    if (index === 0) {
      carouselArrowLeft.style.display = 'none';
      carouselInner.style.transform = '';
    }
  });
}
