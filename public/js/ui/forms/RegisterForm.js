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
    User.register( data, (err, response) => {
      if (err) {        
        throw Error('Ошибка запроса');    
      }
      if(response) {
        App.setState( 'user-logged' );
        AsyncForm.element.reset();
        App.getModal('register').close();
      }
       
    })
  }
}
