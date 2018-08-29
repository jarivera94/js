'use strict';

const request = require('request-promise');
const moment =  require("moment");


function createOpportunity(opportunity, sessionId, apiUserId) {
  //console.log("LLego a oportunidad Sugar");
    let userData = {
        session: sessionId,
        module_name: "Opportunities",
        name_value_list: {
            salutation_c: opportunity.salutation,
            name: opportunity.name,
            lastname_c: opportunity.lastName,
            description: opportunity.description,
            email_c: opportunity.email,
            negotiation_c: opportunity.negotiation,
            apartamentos_c: opportunity.apartments,
            sales_stage: opportunity.salesStage,
            probability: opportunity.probability,
            isnaturalperson_c: opportunity.isnaturalperson,
            campaign_id: opportunity.campaign.id,
            account_id: opportunity.account.id,
            assigned_user_id: apiUserId
        }
    };
    let options = {
        method: 'POST',
        url: process.env.API, // Variable configurada en archivo .env (variables de entorno)
        form: {
            method: "set_entry",
            input_type: "JSON",
            response_type: "JSON",
            rest_data: JSON.stringify(userData)
        }
    };
    return new Promise((resolve, reject) => {
        request(options)
            .then((response) =>{
              //console.log("sugarID---->",response);
              resolve(JSON.parse(response))
            })
            .catch((err) => reject(err));
    });
}


function readOpportunity(sessionId, apiUserId) {
    let userData = {
        session: sessionId,
        module_name: "Opportunities",
        query: "",
        order_by: "opportunities.date_entered DESC",
        offset: 0,
        select_fields: [
            "id",
            "salutation_c",
            "name",
            "lastname_c",
            "description",
            "email_c",
            "negotiation_c",
            "apartamentos_c",
            "sales_stage",
            "probability",
            "isnaturalperson_c"
        ],link_name_to_fields_array : [{
        name:"campaign_opportunities",
        value:["id","name"]
        },{
            name:"accounts",
            value:["id","name","phone","industry","typeDocument","email1","documentNumber","type"]
        }
      ],
      max_results: process.env.MAX_RESULTS,
      delete:0
    };
    //console.log(JSON.stringify(userData));
    let options = {
        method: 'POST',
        url: process.env.API, // Variable configurada en archivo .env (variables de entorno)
        form: {
            method: "get_entry_list",
            input_type: "JSON",
            response_type: "JSON",
            rest_data: JSON.stringify(userData)
        }
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then((response) => {
                resolve(JSON.parse(response));
            })
            .catch((err) => reject(err));
    });

}

function readOpportunityApartments(sessionId, CampaignId) {
    let userData = {
        session: sessionId,
        module_name: "Opportunities",
        query: "opportunities.campaign_id = '"+CampaignId+"' and opportunities.probability = '100' and opportunities.sales_stage = 'Concreted'",
        order_by: "",
        offset: 0,
        select_fields: [
            "apartamentos_c"
        ],link_name_to_fields_array : [[]],
      max_results: process.env.MAX_RESULTS,
      delete:0
    };
    //console.log(JSON.stringify(userData));
    let options = {
        method: 'POST',
        url: process.env.API, // Variable configurada en archivo .env (variables de entorno)
        form: {
            method: "get_entry_list",
            input_type: "JSON",
            response_type: "JSON",
            rest_data: JSON.stringify(userData)
        }
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then((response) => {
                resolve(JSON.parse(response));
            })
            .catch((err) => reject(err));
    });

}


function readCampaignProject(idCampaign, sessionId) {

    let userData = {
        session: sessionId,
        module_name: "Campaigns",
        id: idCampaign,
        select_fields: [
            "id"
        ],link_name_to_fields_array : [{
            name:"p_proyectos_campaigns_1",
            value:["id","name"]
        }
      ],
      max_results: process.env.MAX_RESULTS,
      delete:0
    };
    let options = {
        method: 'POST',
        url: process.env.API, // Variable configurada en archivo .env (variables de entorno)
        form: {
            method: "get_entry",
            input_type: "JSON",
            response_type: "JSON",
            rest_data: JSON.stringify(userData)
        }
    };

    return new Promise((resolve, reject) => {
        request(options)
            .then((response) => {
                resolve(JSON.parse(response));
            })
            .catch((err) => reject(err));
    });

}


function deleteOpportunity(opportunity, sessionId, apiUserId) {
    let userData = {
        session: sessionId,
        module_name: "Opportunities",
        name_value_list: {
            id: opportunity.id,
            deleted: 1
        }
    };

    let options = {
        method: 'POST',
        url: process.env.API, // Variable configurada en archivo .env (variables de entorno)
        form: {
            method: "set_entry",
            input_type: "JSON",
            response_type: "JSON",
            rest_data: JSON.stringify(userData)
        }
    };
    return new Promise((resolve, reject) => {
        request(options)
            .then((response) => resolve(JSON.parse(response)))
            .catch((err) => reject(err));
    });
}

function updateOpportunity(opportunity, sessionId, apiUserId) {
    let userData = {
        session: sessionId,
        module_name: "Opportunities",
        name_value_list: {
          id: opportunity.id,
          salutation_c: opportunity.salutation,
          name: opportunity.name,
          lastname_c: opportunity.lastName,
          description: opportunity.description,
          email_c: opportunity.email,
          negotiation_c: opportunity.negotiation,
          apartamentos_c: opportunity.apartments,
          sales_stage: opportunity.salesStage,
          probability: opportunity.probability,
          isnaturalperson_c: opportunity.isnaturalperson,
          campaign_id: opportunity.campaign.id,
          account_id: opportunity.account.id,
          assigned_user_id: apiUserId
        }
    };

    let options = {
        method: 'POST',
        url: process.env.API, // Variable configurada en archivo .env (variables de entorno)
        form: {
            method: "set_entry",
            input_type: "JSON",
            response_type: "JSON",
            rest_data: JSON.stringify(userData)
        }
    };
    return new Promise((resolve, reject) => {
        request(options)
            .then((response) => resolve(JSON.parse(response)))
            .catch((err) => reject(err));
    });
}

module.exports = {
    createOpportunity,
    readOpportunity,
    deleteOpportunity,
    updateOpportunity,
    readCampaignProject,
    readOpportunityApartments
};
