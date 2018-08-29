'use strict';
//Instancia a los metodos que se invocan a sugar.
const contactSugar = require('../dal/ContactSugar');
const sourcesUtils = require('../utils/sources');
const Contact = require('../cbo/Contact');

/**
 * Obtiene el contacto relacionada a un contacto
 * @param  {[type]} link_list Objeto de lista que devuelve sugar con las relaciones
 * @return {[type]}           Objeto  con id y nombre de la cuenta
 */
function getrelatedAccount(link_list)
{
  let account = {};
  link_list.find(function(relatedBean) {
      if (relatedBean.name === "accounts") {
      //console.log("relatedBean: ", relatedBean.records);
      if (relatedBean.records.length > 0){
        account= {
          id: relatedBean.records[0].link_value.id.value,
          name: relatedBean.records[0].link_value.name.value
        };
      }
    }
  });
  return account;
}

/**
 * Crea, elimina o modifica la relación entre una  y una campaña
 * @param  {String} idcontact  Identificador de la
 * @param  {String} idCampaign Identificador de la campaña
 * @param  {String} sessionId  Identificador de la sesion
 * @param  {Number} toDelete   Determina si se elimina o no la relación.
                                0: no elimina la relación.
                                1: elimina la relación.
 * @return {String}            [description]
 */
function modifyRelationships(idcontact, idAccount, sessionId, toDelete){
    return new Promise((resolve, reject) =>{
            contactSugar.modifyRelationships(idcontact,idAccount,sessionId,toDelete)
            .then((response)=>resolve(response))
            .catch((err) => reject(err));
    });
}

/**
 * Actualiza o crea
 * @param  {contact} contact  contacto.
                            Con la propiedad Id, Actualiza el contacto.
                            Si la propiedad Id, Crea el contacto
 * @param  {String} sessionId Identificador de la sesion.
 * @param  {String} apiUserId Identificador del usuario.
 * @return {[type]}           [description]
 */
function modifyContact(contact,sessionId,apiUserId) {
    return new Promise((resolve, reject) => {
        contactSugar.modifyContact(contact,sessionId,apiUserId)
        .then((response) => {
          console.log("Hubo respuesta : ", response);
            resolve(modifyRelationships(response.id, contact.Account.id, sessionId,0));
        })
        .catch((err) => { reject(err);});
    });
}

/**
 * Elimina el contacto y la relación
 * @param  {string} contactId  Identificador de el contacto
 * @param  {string} campaignId Identificador de la campaña relacionada
 * @param  {string} sessionId  Identificador de la sesion.
 * @return {[type]}            [description]
 */
function deleteContact(contactId,idAccount, sessionId) {
    return new Promise((resolve, reject) => {
            contactSugar.deleteContact(contactId,sessionId)
            .then((response) => {
                resolve(modifyRelationships(contactId, idAccount, sessionId,1));
            })
            .catch((err) => reject(err));
    });
}

/**
 * Obtiene las contactos con la campaña relacionada.
 * @param  {String} sessionId Token de la sesion en sugar.
 * @return {[type]}           [description]
 */
function getContacts(sessionId){
    return new Promise((resolve, reject) =>{
            contactSugar.getContacts(sessionId,"","first_name",0,[],0)
            .then((response)=> {
              let contacts = [];
              console.log(response);
              let listdata = response.entry_list;
              var data = {};
              var contact = new Contact();
              let emails = [];
              let link_list = [];
              for (var i = 0;  i < listdata.length; i++) {
                  contact = new Contact();
                  data = listdata[i].name_value_list;
                  emails = [];
                  //console.log("datapoc", data);
                  contact.id = data.id.value;
                  contact.salutation = data.salutation.value;
                  contact.firstName = data.first_name.value;
                  contact.lastName = data.last_name.value;
                  contact.phoneMobile = data.phone_mobile.value;//hjgjk
                  contact.phoneHome = data.phone_home.value;//hufigjy
                  contact.email = data.email1.value;
                  contact.isMainContact = data.ismaincontact_c.value;

                  link_list = response.relationship_list[i].link_list;
                  contact.Account = getrelatedAccount(link_list);
                  contacts.push(contact);
              }
              resolve(contacts);})
            .catch((err) =>{ reject(err); console.log("muestra error", err);});
    });
}

module.exports = {
    modifyContact,
    modifyRelationships,
    deleteContact,
    getContacts
};
