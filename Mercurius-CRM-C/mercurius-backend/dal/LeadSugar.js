'use strict';

const request = require('request-promise');
const moment =  require("moment");


function createLead(lead, sessionId, apiUserId) {

    let userData = {
        session: sessionId,
        module_name: process.env.LEAD_MODULE,
        name_value_list: {
            salutation: lead.salutation,
            first_name: lead.firstname,
            last_name: lead.lastname,
            phone_mobile: lead.phone_mobile,
            phone_home: lead.phone_home,
            description: lead.description,
            tipo_cliente_c: lead.customer_type,
            campaign_id: lead.campaign.id,
            date_created_c: moment(lead.date_created).format("YYYY-MM-DD HH:mm:ss"),
            email1: lead.email1,
            revisado_c: lead.reviewed,
            converted: lead.converted,
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

function readLead(sessionId, apiUserId) {

    let userData = {
        session: sessionId,
        module_name: process.env.LEAD_MODULE,
        query: "",
        order_by: "leads.date_entered DESC",
        offset: 0,
        select_fields: [
            "id",
            "salutation",
            "first_name",
            "last_name",
            "phone_home",
            "phone_mobile",
            "description",
            "tipo_cliente_c",
            "campaign_id",
            "date_created_c",
            "email1",
            "revisado_c",
            "converted"
        ],link_name_to_fields_array : [{
            name:process.env.LEAD_CAMPAIGN_RELATION_NAME,
            value:["id","name"]
        },
        {
          name:"email_addresses",
          value:["id","email_address","primary_address"]
        }
      ],
      max_results: process.env.MAX_RESULTS,
      delete:0
    };
    //console.log(userData);
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

function readLeadOpportunity(idOpportunity, sessionId) {

    let userData = {
      session: sessionId,
      module_name: process.env.LEAD_MODULE,
      query: "leads.opportunity_id = '"+idOpportunity+"'",
      order_by: "leads.date_entered DESC",
      offset: 0,
      select_fields: [
          "id",
          "salutation",
          "first_name",
          "last_name",
          "phone_home",
          "phone_mobile",
          "description",
          "tipo_cliente_c",
          "campaign_id",
          "date_created_c",
          "email1",
          "revisado_c",
          "converted"
        ],link_name_to_fields_array : [[]],
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

function deleteLead(lead, sessionId, apiUserId) {
  console.log("LeadSugar: "+ lead.id);
    let userData = {
        session: sessionId,
        module_name: process.env.LEAD_MODULE,
        name_value_list: {
            id: lead.id,
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

function updateLead(lead, sessionId, apiUserId) {
var email = "email";
    let userData = {
        session: sessionId,
        module_name: process.env.LEAD_MODULE,
        name_value_list: {
            id: lead.id,
            salutation: lead.salutation,
            first_name: lead.firstname,
            last_name: lead.lastname,
            phone_mobile: lead.phone_mobile,
            phone_home: lead.phone_home,
            description: lead.description,
            tipo_cliente_c: lead.customer_type,
            campaign_id: lead.campaign.id,
            date_created_c: moment(lead.date_created).format("YYYY-MM-DD HH:mm:ss"),
            email1: lead.email1,
            revisado_c: lead.reviewed,
            converted: lead.converted,
            opportunity_id: lead.opportunity.id
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
            .then((response) => {
              console.log("responseSugarLead",JSON.stringify(response));
              resolve(JSON.parse(response))}
            ).catch((err) => reject(err));
    });
}

module.exports = {
    createLead,
    readLead,
    deleteLead,
    updateLead,
    readCampaignProject,
    readLeadOpportunity
};
