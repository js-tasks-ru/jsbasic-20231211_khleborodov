import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = this.createModal();
    
    this.closeWithClick();
    this.closeWithESC();
  }

  createModal() {
    let modalWindow = createElement(`
      <div class="modal">
        <!--Прозрачная подложка перекрывающая интерфейс-->
        <div class="modal__overlay"></div>
        
        <div class="modal__inner">
          <div class="modal__header">
            <!--Кнопка закрытия модального окна-->
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            
            <h3 class="modal__title">
              Вот сюда нужно добавлять заголовок
            </h3>
          </div>
          
          <div class="modal__body">
            A сюда нужно добавлять содержимое тела модального окна
          </div>
        </div>
      </div>`);
    
    return modalWindow;
  }
  
  setTitle(modalTitle) {
    const modalTitleElement = this.modal.querySelector('.modal__title');
    modalTitleElement.textContent = modalTitle;
  }
  
  setBody(node) {
    const modalBodyElement = this.modal.querySelector('.modal__body');
    modalBodyElement.textContent = '';
    modalBodyElement.insertAdjacentElement('afterbegin', node);
  }
  
  open() {
    document.body.insertAdjacentElement('afterbegin', this.modal);
    document.body.classList.add('is-modal-open');
  }
  
  
  close() {
    this.modal.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.closeWithESC);
  }


  closeWithESC() {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    });
  }
  
  closeWithClick() {
    const modalClose = this.modal.querySelector('.modal__close');
    modalClose.addEventListener('click', () => {
      this.close();
    });
  }
}
