'use strict';
//Instancia a los metodos que se invocan a sugar.
const AccountSugar = require('../dal/AccountSugar');
const ContactSugar = require('../bll/ContactLogic');
const typeUtils = require('../utils/types');
const Account = require('../cbo/Account');
const Contact = require ('../cbo/Contact');


/**
 * Obtiene la campaña relacionada a una cuenta
 * @param  {[type]} link_list Objeto de lista que devuelve sugar con las relaciones
 * @return {[type]}           Objeto  con id y nombre de la camapaña
 */
function getrelatedCampaign(link_list)
{
  let campaign = {};
  link_list.find(function(relatedBean) {
    if (relatedBean.name === "campaign_accounts") {
      campaign= {
        id: relatedBean.records[0].link_value.id.value,
        name: relatedBean.records[0].link_value.name.value
      };
    }
  });
  return campaign;
}

/**
 * Valida si la cuente tiene oportunidades concretadas
 * @param  {Boolean} validateOpConcreted true: Devuelve lso clientes con oportunidades concretadas;
 *                                  false: Devuelve todos los clientes
 * @param  {[type]} link_list       Lista de relaciones
 * @return {Boolean}                true: si withOpConcreted es falso o si tiene oportunidades concretadas o si no tiene oportunidades
 *                                  false: si withOpConcreted es true y no tiene oportunidades concretadas.
 */
function anyConcreted(validateOpConcreted, link_list){{
  var haveOpportunities  = false;
  var haveConcreted = false;
  if(!validateOpConcreted)  return true;
  else
    link_list.find(function(relatedBean) {
      if (relatedBean.name === "opportunities") {
        haveOpportunities = true;
        for(var obj in relatedBean.records){
          if(relatedBean.records[obj].link_value.sales_stage.value == "concreted"){
            haveConcreted = true; //Si encuentra una oportunidad concretada devuelve true.
            return;
          }
        }
      }
    });
    //si tiene oportunidades entonces ninguna está concretada.
    //si no tiene oportunidades se devuelve false.
    return haveOpportunities? haveConcreted: true;
  }
}


/**
 * Crea, elimina o modifica la relación entre una cuenta y una campaña
 * @param  {String} idAccount  Identificador de la cuenta
 * @param  {String} idCampaign Identificador de la campaña
 * @param  {String} sessionId  Identificador de la sesion
 * @param  {Number} toDelete   Determina si se elimina o no la relación.
                                0: no elimina la relación.
                                1: elimina la relación.
 * @return {String}            [description]
 */
function modifyCampaignRelationship(idAccount, idCampaign, sessionId, toDelete){
    return new Promise((resolve, reject) =>{
            AccountSugar.modifyCampaignRelationship(idAccount,idCampaign,sessionId,toDelete)
            .then((response)=>{
              response.idAccount = idAccount;
              resolve(response);})
            .catch((err) => reject(err));
    });
}

function modifycontact (contact, sessionId, apiUserId){
  return new Promise ((resolve, reject) =>{
    ContactSugar.modifyContact(contact, sessionId, apiUserId)
    .then((respon)=>resolve(respon))
    .catch((err) => reject(err));
  });
}

/**
 * Actualiza o crea cuenta
 * @param  {Account} account  Cuenta.
                            Con la propiedad Id, Actualiza la cuenta.
                            Si la propiedad Id, Crea la cuenta
 * @param  {String} sessionId Identificador de la sesion.
 * @param  {String} apiUserId Identificador del usuario.
 * @return {[type]}           [description]
 */
function modifyAccount(account,sessionId,apiUserId) {
    return new Promise((resolve, reject) => {
        AccountSugar.modifyAccount(account,sessionId,apiUserId)
        .then((response) => {
            var contact = new Contact();
            let dataContact = {};
            var respuesta = {};
            if (account.Contacts != undefined && account.Contacts.length > 0){
              for (var i = 0; i < account.Contacts.length; i++) {
                dataContact = account.Contacts[i];
                  contact = new Contact(null, dataContact.salutation, dataContact.firstName, dataContact.lastName, dataContact.phoneHome, dataContact.phoneMobile, dataContact.email, dataContact.isMainContact, response.id);
                respuesta = modifycontact(contact, sessionId, apiUserId);
              }
            }
            resolve(modifyCampaignRelationship(response.id,account.Campaign.id, sessionId,0));
        })
        .catch((err) => reject(err));
    });
}

/**
 * Elimina la cuenta y la relación
 * @param  {string} accountId  Identificador de la cuenta
 * @param  {string} campaignId Identificador de la campaña relacionada
 * @param  {string} sessionId  Identificador de la sesion.
 * @return {[type]}            [description]
 */
function deleteAccount(accountId,campaignId,sessionId) {
    return new Promise((resolve, reject) => {
            AccountSugar.deleteAccount(accountId,sessionId)
            .then(() => {
                resolve(modifyCampaignRelationship(accountId, campaignId, sessionId,1));
            })
            .catch((err) => reject(err));
    });
}
/**
 * Obtiene las cuentas con la campaña relacionada.
 * @param  {String} sessionId Token de la sesion en sugar.
 * @param  {Boolean} validateOpConcreted true: Devuelve lso clientes con oportunidades concretadas;  false: Devuelve todos los clientes
 * @return {[type]}           [description]
 */
function getAccounts(sessionId, validateOpConcreted){
    return new Promise((resolve, reject) =>{
            AccountSugar.getAccounts(sessionId,"","",0,[],0)
            .then((response)=> {
              let accounts = [];
              let listdata = response.entry_list;
              var data = {};
              var account = new Account();
              let emails = [];
              let link_list = [];
              for (var i = 0;  i < listdata.length; i++) {
                  account = new Account();
                  data = listdata[i].name_value_list;
                  emails = [];
                  //console.log("datapoc", data);
                  account.id = data.id.value;
                  account.name = data.name.value;
                  account.lastName = data.lastname_c.value;
                  account.phone = data.phone_office.value;
                  account.email = data.email1.value;
                  account.address = data.billing_address_street.value;
                  account.description = data.description.value;
                  account.typeDocument = data.account_doctype_c.value;
                  // account.type = typeUtils.getTypeByName(data.account_type.value, typeUtils.ACCOUNTTYPES);
                  // account.industry = typeUtils.getTypeByName(data.industry.value, typeUtils.INDUSTRYTYPES);
                  // account.typeDocument = typeUtils.getTypeByName(data.account_doctype_c.value, typeUtils.DOCTYPES);
                  account.documentNumber = data.account_document_c.value;
                  link_list = response.relationship_list[i].link_list;
                  account.Campaign = getrelatedCampaign(link_list);
                  if(anyConcreted(validateOpConcreted, link_list)){
                    accounts.push(account);
                  }
              }
              resolve(accounts);})
            .catch((err) => reject(err));
    });
}

module.exports = {
    modifyAccount,
    modifyCampaignRelationship,
    deleteAccount,
    getAccounts
};
