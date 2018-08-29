'use strict';

const request = require('request-promise');

/**
 * Crear la campaña (sin la relación).
 * @param  {Campaign} campaign  Campaña.
 * @param  {string} sessionId Token de la session en sugar.
 * @param  {string} apiUserId Identificador del usuario que se logea.
 * @return {[type]}           Json devuelto por el API.
 */
function createCampaign(campaign, sessionId,apiUserId) {
    let campaignData = {
        session: sessionId,
        module_name: "Campaigns",
        name_value_list: {
            name: campaign.name,
            start_date: campaign.startDate,
            end_date: campaign.endDate,
            content: campaign.description,
            campaign_type: campaign.type,
            status: campaign.status,
            budget: campaign.budget,
            actual_cost: campaign.actualCost,
            assigned_user_id : apiUserId
        }
    };
//console.log("campaignData: ", campaignData);
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
 * Actualiza la campaña
 * @param  {[type]} campaign  [description]
 * @param  {[type]} sessionId Token de la session en sugar.
 * @param  {[type]} apiUserId Identificador del usuario que se logea.
 * @return {[type]}           [description]
 */
function updateCampaign(campaign, sessionId,apiUserId) {
    let campaignData = {
        session: sessionId,
        module_name: "Campaigns",
        name_value_list: {
            name: campaign.name,
            start_date: campaign.startDate,
            end_date: campaign.endDate,
            content: campaign.description,
            campaign_type: campaign.type,
            status: campaign.status,
            budget: campaign.budget,
            actual_cost: campaign.actualCost,
            id: campaign.id,
            assigned_user_id : apiUserId
        }
    };
    console.log("data: ", campaignData);
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
 * Crea, Actualiza y elimina la relación entre el proyecto y la campaña
 * @param  {string} IdCampaign Identificador de la Campaña
 * @param  {string} IdProject  Identificador del Proyecto
 * @param  {string} sessionId  Identificador de la sesion.
 * @param  {string} toDelete  0: No eliminar 1:Eliminar
 * @return {[type]}            Objeto devuelto por el API.
 */
function createProjectRelationship(IdCampaign, IdProject, sessionId, toDelete) {

    let campaignData = {};
    if(toDelete === 1)
    {
        campaignData = {
            session: sessionId,
            module_name: "Campaigns",
            module_id: IdCampaign,
            link_field_name: process.env.CAMPAIGN_PROJECT_RELATION_NAME,
            related_ids:[IdProject],
            name_value_list:[["name"]],
            delete_array:[toDelete]
        };
    }
    else
    {
        campaignData = {
            session: sessionId,
            module_name: "Campaigns",
            module_id: IdCampaign,
            link_field_name: process.env.CAMPAIGN_PROJECT_RELATION_NAME,
            related_ids:[IdProject],
            name_value_list:[["name"]]
        };
    }
    //console.log(JSON.stringify(campaignData));
    let options = {
        method: 'POST',
        url: process.env.API, // Variable configurada en archivo .env (variables de entorno)
        form: {
            method: "set_relationship",
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
 * Elimina la campaña
 * @param  {[type]} campaign  Camapaña a eliminar
 * @param  {[type]} sessionId Token de la session en sugar.
 * @return {[type]}           [description]
 */
function deleteCampaign(campaign, sessionId) {
    let campaignData = {
        session: sessionId,
        module_name: "Campaigns",
        name_value_list: {
            id: campaign.id,
            deleted:1
        }
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
function getCampaigns(sessionId, query, orderField, offset, selectedFields, max_results){
    let campaignData = {
        session: sessionId,
        module_name: "Campaigns",
        query:query,
        order_by: "campaigns.date_entered DESC",
        offset: offset,
        select_fields: selectedFields,
        link_name_to_fields_array : [{
            name:process.env.CAMPAIGN_PROJECT_RELATION_NAME,
            value:["id","name","description"]
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
    //console.log("peticion: ", options);
    return new Promise((resolve, reject) => {
        request(options)
            .then((response) =>{
                resolve(JSON.parse(response));})
            .catch((err) => reject(err));
});
}

module.exports = {
    createCampaign,
    createProjectRelationship,
    getCampaigns,updateCampaign,
    deleteCampaign
};
