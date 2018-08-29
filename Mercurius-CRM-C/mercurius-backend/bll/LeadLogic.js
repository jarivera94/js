'use strict';
const Lead = require('../cbo/Lead');
const LeadSugar = require('../dal/LeadSugar');
const statesUtils = require('../utils/states');
const sourceUtils = require('../utils/sources');

/**
 * Método que se encarga de llamar a la capa del DAL enviando el objeto de tipo usuario con el usuario y contraseña para
 * hacer la petición contra la url de sugar API
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
function createLead(lead,sessionId,apiUserId) {

    return new Promise((resolve, reject) => {
        LeadSugar.createLead(lead,sessionId,apiUserId)
            .then((response) => {
                resolve(response);})
            .catch((err) => reject(err));
    });
}

function deleteLead(lead,sessionId,apiUserId) {
    return new Promise((resolve, reject) => {
        LeadSugar.deleteLead(lead,sessionId,apiUserId)
            .then((response) => {
                resolve(response);})
            .catch((err) => reject(err));
    });
}

function updateLead(lead,sessionId,apiUserId) {
    return new Promise((resolve, reject) => {
        LeadSugar.updateLead(lead,sessionId,apiUserId)
            .then((response) => {
                resolve(response.id);})
            .catch((err) => reject(err));
    });
}


/**
 * Obtiene la campaña relacionada a una cuenta
 * @param  {[type]} link_list Objeto de lista que devuelve sugar con las relaciones
 * @return {[type]}           Objeto  con id y nombre de la camapaña
 */
function getrelatedCampaign(link_list)
{
  let campaign = {};
  link_list.find(function(relatedBean) {
    if (relatedBean.name === "campaign_leads") {
      campaign= {
        id: relatedBean.records[0].link_value.id.value,
        name: relatedBean.records[0].link_value.name.value
      };
    }
  });
  return campaign;
}

/**
 * Obtiene los correos relacionados a una cuenta
 * @param  {[type]} link_list Objeto de lista que devuelve sugar con las relaciones
 * @param  {String} primaryEmail Email primario
 * @return {[type]}           Arreglo de identificadores y correos
 */


function getrelatedProject(idCampaign, sessionId) {
  return new Promise((resolve, reject) => {
    console.log("idCampaign: ",idCampaign);
    if(idCampaign==="" || idCampaign === undefined){
      let project = {
        id:"",
        name: ""
      };
      resolve(project);
    }else{
      LeadSugar.readCampaignProject(idCampaign, sessionId)
        .then((response) => {
          let project = {
            id: response.relationship_list[0][0].records[0].id.value,
            name: response.relationship_list[0][0].records[0].name.value
          };
          console.log(project);
          resolve(project);
        }).catch((err) => reject(err));
    }
  });
}

function readLead(sessionId,apiUserId) {
    return new Promise((resolve, reject) => {
        LeadSugar.readLead(sessionId,apiUserId)
            .then((response) => {
              let leads = [];
              let listdata = response.entry_list;
              let link_list = [];
              let emails = [];
              let i;
              let promises = [];
              let leadObjectPromise = function(resolve, reject) {
                console.log("Consultando ......");
                var lead = new Lead();
                var data = listdata[i].name_value_list;
                emails = [];
                lead.id = data.id.value;
                lead.salutation = data.salutation.value;
                lead.firstname = data.first_name.value;
                lead.lastname = data.last_name.value;
                lead.phone_home = data.phone_home.value;
                lead.phone_mobile = data.phone_mobile.value;
                lead.description = data.description.value;
                lead.customer_type = data.tipo_cliente_c.value;
                lead.date_created = data.date_created_c.value;
                lead.email1 = data.email1.value;
                lead.reviewed = data.revisado_c.value;
                lead.converted = data.converted.value;
                link_list =  response.relationship_list[i].link_list;
                lead.campaign = getrelatedCampaign(link_list);
                getrelatedProject(lead.campaign.id, sessionId).then((project) => {
                  lead.project = project;
                  resolve(lead);
                }).catch((err) => {
                  console.log("err1: ", err);
                  reject(err);
                });
                }
                for (i = 0; i < listdata.length; i++) {
                  promises.push(new Promise(leadObjectPromise));
                }

                Promise.all(promises).then((leads) => {
                  resolve(leads);
                }).catch((err) => {
                  console.log("err2: ", err);
                  reject(err);
                })
              }).catch((err) => reject(err));
          });
        }

        function getLeadOpportunity(idOpportunity, sessionId) {
          return new Promise((resolve, reject) => {
            console.log("idOpportunity: ",idOpportunity);
            if(idOpportunity==="" || idOpportunity === undefined){
              let project = {
                id:"",
                name: ""
              };
              resolve(project);
            }else{
              LeadSugar.readLeadOpportunity(idOpportunity, sessionId)
              .then((response) => {
                let listdata = response.entry_list;
                console.log(JSON.stringify(response));
                  var lead = new Lead();
                  var data = listdata[0].name_value_list;
                  lead.id = data.id.value;
                  lead.salutation = data.salutation.value;
                  lead.firstname = data.first_name.value;
                  lead.lastname = data.last_name.value;
                  lead.phone_home = data.phone_home.value;
                  lead.phone_mobile = data.phone_mobile.value;
                  lead.description = data.description.value;
                  lead.customer_type = data.tipo_cliente_c.value;
                  lead.date_created = data.date_created_c.value;
                  lead.email1 = data.email1.value;
                  lead.reviewed = data.revisado_c.value;
                  lead.converted = data.converted.value;

                  resolve(lead);
                  }).catch((err) => {
                    console.log("err2: ", err);
                    reject(err);
                  })
                }
          });
        }

module.exports = {
    createLead,
    readLead,
    deleteLead,
    updateLead,
    getLeadOpportunity
};
