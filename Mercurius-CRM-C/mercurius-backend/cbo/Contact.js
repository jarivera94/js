'use strict';

class Contact {
  /**
   * Constructor de Contacto
   * @param  {String}  id            identificador del contacto
   * @param  {String}  salutation    Saludo
   * @param  {String}  firstName     Nombre del contacto
   * @param  {String}  lastName      Apellido del contacto
   * @param  {Number}  phoneHome     Telefono del Contacto
   * @param  {Number}  phoneMobile   Celular del Contacto
   * @param  {String}  email         Correo del contacto
   * @param  {Boolean} isMainContact Determina si es contacto Principañ
   * @param  {object-String}  Account      Cuenta a la que se relaciona el contacto. Espera un objeto con la propiedad id o el id de la cuenta.
   * @return {[type]}                [description]
   */
  constructor(id, salutation, firstName, lastName,  phoneHome, phoneMobile, email, isMainContact, Account) {
    this.id = id;
    this.salutation = salutation;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneHome = phoneHome;
    this.phoneMobile = phoneMobile;
    this.isMainContact = isMainContact;
    this.email = email;
    if(typeof(Account) == "object")
    {
      this.Account = {id : Account.id};
    }else{
      this.Account = {id : Account};
    }
  }

}

module.exports = Contact;
