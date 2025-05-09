/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показ боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    document.querySelector('.sidebar-toggle').addEventListener('click', (e) => {
      document.querySelector('body').classList.toggle('sidebar-open');
      document.querySelector('body').classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регистрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    document.querySelector('.menu-item_login').addEventListener('click', (e) => {
      App.getModal('login').open();
      App.getModal('login').registerEvents();
    });
    document.querySelector('.menu-item_register').addEventListener('click', (e) => {
      App.getModal('register').open();
      App.getModal('register').registerEvents();
    });
    
    document.querySelector('.menu-item_logout').addEventListener('click', (e) => {
      User.logout(callback);      
    });
  }
}