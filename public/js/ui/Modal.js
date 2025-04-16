/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element){
    this.element = element;
    if(!element) {
      alert('Ошибка');
    }

  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    document.querySelectorAll('[data-dismiss="modal"]').addEventListener('click', (e) => {
      Modal.onClose(e);
    }) 

  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {
    const button = document.querySelectorAll('button');
    button.addEventListener('click', (e) => {
      if(e.target === this.element) {
        Modal.close();
      }
    })
  }

  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.classList.add('app_user-logged');
  }

  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
    this.element.classList.remove('app_user-logged');
  }
}