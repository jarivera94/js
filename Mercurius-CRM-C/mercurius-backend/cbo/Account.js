'use strict';
/**
 * Client
 */
class Account {
  /**
   * [constructor description]
   * @param  {String} id             [id]
   * @param  {String} name           [name]
   * @param  {String} lastName       [lastName]
   * @param  {String} email          [email]
   * @param  {Number} phone          [phone]
   * @param  {String} address        [address]
   * @param  {String} description    [description]
   * @param  {typeDocument} typeDocument   [type Document]
   * @param  {Number} documentNumber [document Number]
   * @param  {Number} campaignId     [id Campaig]
   * @param  {Contact[]} contacts       [Array of contacts]
   * @return {[type]}                [description]
   */
  constructor(id, name, lastName, email, phone, address, description, typeDocument, documentNumber, campaignId, contacts) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.description = description;
    this.typeDocument = typeDocument;
    this.documentNumber = documentNumber;
    this.Campaign = { id : campaignId };
    this.Contacts = contacts;
  }

}

module.exports = Account;
