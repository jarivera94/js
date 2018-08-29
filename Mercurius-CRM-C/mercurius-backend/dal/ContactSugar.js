'use strict';

const request = require('request-promise');

/**
 * Crea, Actualiza o elimina lasn relaciones del contacto
 * @param  {String} contactId  Identificador de la contacto
 * @param  {String} campaignId Identificador de la campaña
 * @param  {String} sessionId  Identificador de la sesion
 * @param  {Number} toDelete   Determina si se elimina o no la relación.
                                0: no elimina la relación.
                                1: elimina la relación.
 * @return {[type]}           [description]
 */
function modifyRelationships(contactId, accountId, sessionId, toDelete) {
    console.log("here");
    let contactData = {};
    contactData = {
      session: sessionId,
      module_names: ["Contacts"],
      module_ids: [contactId],
      link_field_names: [ "accounts"],
      related_ids:[[accountId]],
      name_value_list:[["name"]],
    };

    if(toDelete === 1)
        contactData.delete_array = [1,1];
    console.log("relationship :", contactData);
    let options = {
        method: 'POST',
        url: process.env.API, // Variable configurada en archivo .env (variables de entorno)
        form: {
            method: "set_relationships",
            input_type: "JSON",
            response_type: "JSON",
            rest_data: JSON.stringify(contactData)
        }
    };
    return new Promise((resolve, reject) => {
        request(options)
            .then((response) => resolve(JSON.parse(response)))
            .catch((err) => reject(err));
    });
}

/**
 * Actualiza o crea contacto
 * @param  {contact} contact  contacto.
                            Con la propiedad Id, Actualiza la contacto.
                            Si la propiedad Id, Crea la contacto
 * @param  {String} sessionId Identificador de la sesion.
 * @param  {String} apiUserId Identificador del usuario.
 * @return {[type]}           [description]
 */
function modifyContact(contact, sessionId,apiUserId) {
    let name_value_list_data = {};
    name_value_list_data = {
         salutation: contact.salutation,
         first_name : contact.firstName,
         last_name : contact.lastName,
         phone_mobile : contact.phoneMobile,
         phone_home : contact.phoneHome,
         ismaincontact_c : contact.isMainContact,
         email1: contact.email,
         assigned_user_id : apiUserId
    };
    if (contact.id != 0 && contact.id != null && contact.id != undefined)
        name_value_list_data.id = contact.id;
    let campaignData = {
        session: sessionId,
        module_name: "Contacts",
        name_value_list: name_value_list_data
    };
    let options = {
        method: 'POST',
        url: process.env.API, // Variable configurada en archivo .env (variables de entorno)
        form: {
            method: "set_entry",
            input_type: "JSON",
            response_type: "JSON",
            rest_data: JSON.stringify(campaignData)
        }
    };
    return new Promise((resolve, reject) => {
        request(options)
            .then((response) => resolve(JSON.parse(response)))
            .catch((err) => reject(err));
    });
}

/**
 * Elimina el contacto
 * @param  {[type]} idcontact Identficador del contacto.
 * @param  {[type]} sessionId Identificador de la sesion.
 * @return {[type]}           [description]
 */
function deleteContact (idcontact, sessionId)
{
    let name_value_list_data = {
            id: idcontact,
            deleted : 1
        };

    let campaignData = {
        session: sessionId,
        module_name: "Contacts",
        name_value_list: name_value_list_data
    };

    let options = {
        method: 'POST',
        url: process.env.API, // Variable configurada en archivo .env (variables de entorno)
        form: {
            method: "set_entry",
            input_type: "JSON",
            response_type: "JSON",
            rest_data: JSON.stringify(campaignData)
        }
    };
    return new Promise((resolve, reject) => {
        request(options)
            .then((response) => resolve(JSON.parse(response)))
            .catch((err) => reject(err));
    });
}

/**
 * Consultar las campañas
 * @param  {[type]} sessionId      Token de la session en sugar.
 * @param  {[type]} query          Query para obtener registros.
 * @param  {[type]} orderField     Campo por el que se ordena.
 * @param  {[type]} offset         offset de los registros a traer.
 * @param  {[type]} selectedFields Campos a mostrar
 * @param  {[type]} max_results    Maximo de resultados.
 * @return {[type]}                Respuesta de sugar
 */
function getContacts(sessionId, query, orderField, offset, selectedFields, max_results){
    let campaignData = {
        session: sessionId,
        module_name: "Contacts",
        query:query,
        order_by: "contacts.date_entered DESC",
        offset: offset,
        select_fields: selectedFields,
        link_name_to_fields_array : [{
            name:"email_addresses",
            value:["id","email_address","primary_address"]
        },{
            name:"accounts",
            value:["id","name"]
        }],
        max_results: process.env.MAX_RESULTS,
        delete:0
    };

    let options = {
        method: 'POST',
        url: process.env.API, // Variable configurada en archivo .env (variables de entorno)
        form: {
            method: "get_entry_list",
            input_type: "JSON",
            response_type: "JSON",
            rest_data: JSON.stringify(campaignData)
        }
    };
    return new Promise((resolve, reject) => {
        request(options)
            .then((response) =>{
                resolve(JSON.parse(response));})
            .catch((err) => reject(err));
});
}


module.exports = {
    modifyContact,
    modifyRelationships,
    deleteContact,
    getContacts
};
