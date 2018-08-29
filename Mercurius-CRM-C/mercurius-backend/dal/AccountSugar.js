'use strict';

const request = require('request-promise');

/**
 * Crea, Actualiza o elimina la relación entre la cuenta y la campaña
 * @param  {String} accountId  Identificador de la cuenta
 * @param  {String} campaignId Identificador de la campaña
 * @param  {String} sessionId  Identificador de la sesion
 * @param  {Number} toDelete   Determina si se elimina o no la relación.
                                0: no elimina la relación.
                                1: elimina la relación.
 * @return {[type]}           [description]
 */
function modifyCampaignRelationship(accountId, campaignId, sessionId, toDelete) {

    let accountData = {};
    if(toDelete === 1)
    {
        accountData = {
          session: sessionId,
          module_name: "Accounts",
          module_id: accountId,
          link_field_name: "campaign_accounts",
          related_ids:[campaignId],
          name_value_list:[["name"]],
          delete_array:[1]
        };
    }
    else
    {
        accountData = {
          session: sessionId,
          module_name: "Accounts",
          module_id: accountId,
          link_field_name: "campaign_accounts",
          related_ids:[campaignId],
          name_value_list:[["name"]],
        };
    }
    let options = {
        method: 'POST',
        url: process.env.API, // Variable configurada en archivo .env (variables de entorno)
        form: {
            method: "set_relationship",
            input_type: "JSON",
            response_type: "JSON",
            rest_data: JSON.stringify(accountData)
        }
    };
    //console.log("options: ",options);
    return new Promise((resolve, reject) => {
        request(options)
            .then((response) => resolve(JSON.parse(response)))
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
function modifyAccount(account, sessionId,apiUserId) {
    let name_value_list_data = {
            name: account.name,
            lastname_c : account.lastName,
            phone_office: account.phone,
            email1: account.email,
            billing_address_street: account.address,
            description: account.description,
            account_doctype_c: account.typeDocument,
            account_document_c: account.documentNumber,
            assigned_user_id : apiUserId
    };

    if (account.id != 0 && account.id != undefined)
        name_value_list_data.id = account.id;

    let campaignData = {
        session: sessionId,
        module_name: "Accounts",
        name_value_list: name_value_list_data
    };
    //console.log("datos: ", campaignData);
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
 * Elimina la cuenta
 * @param  {[type]} idAccount Identficador de la cuenta.
 * @param  {[type]} sessionId Identificador de la sesion.
 * @return {[type]}           [description]
 */
function deleteAccount (idAccount, sessionId)
{
    let name_value_list_data = {
            id: idAccount,
            deleted : 1
        };

    let campaignData = {
        session: sessionId,
        module_name: "Accounts",
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
function getAccounts(sessionId, query, orderField, offset, selectedFields, max_results){
    let campaignData = {
        session: sessionId,
        module_name: "Accounts",
        query:query,
        order_by: "accounts.date_entered DESC",
        offset: offset,
        select_fields: selectedFields,
        link_name_to_fields_array : [{
            name:"campaign_accounts",
            value:["id","name"]
        }, {
            name:"email_addresses",
            value:["id","email_address","primary_address"]
        },{
            name:"opportunities", 
            value:["name", "sales_stage"]
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
    modifyAccount,
    modifyCampaignRelationship,
    deleteAccount,
    getAccounts
};
