/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register( data, ( err, response ) => {
      if(response.success) {
        App.setState( 'user-logged' );
        document.querySelector('.menu-item_register').addEventListener('submit', (e) => {
        document.querySelectorAll('.form').filter(el => el === e.target).reset();
        App.getModal('register').close();      
        });
      } 
      if(err) {
        throw Error("Запрос не удался");        
      }     
    });
  }
}