'use strict';

const CampaignSugar = require('../dal/CampaignSugar');
const Campaign = require('../cbo/Campaign');
const statesUtils = require('../utils/states');
const typeUtils = require('../utils/types');
const moment =  require("moment");


/**
 * Crea modifica o elimina la relación de la campaña y el proyectop
 * @param  {string} idCampaign Identificador de la campaña
 * @param  {string} idProject  Identificador del proyecto
 * @param  {string} sessionId  Token de la sesion en sugar.
 * @param  {Number} toDelete   0: Crea o modifica.
 *                              1: Elimina la relación.
 * @return {[type]}            [description]
 */
function createProjectRelationship(idCampaign, idProject, sessionId, toDelete){
    return new Promise((resolve, reject) =>{
            CampaignSugar.createProjectRelationship(idCampaign,idProject,sessionId,toDelete)
            .then((response)=>resolve(response))
            .catch((err) => reject(err));
    });
}

/**
 * Crea la campaña
 * @param  {Campaña} campaign  Campaña a crear
 * @param  {String} sessionId Token de la sesion en sugar
 * @param  {String} apiUserId Identificador del usuario.
 * @return {[type]}           [description]
 */
function createCampaign(campaign,sessionId,apiUserId) {
    return new Promise((resolve, reject) => {
            CampaignSugar.createCampaign(campaign,sessionId,apiUserId,0)
            .then((response) => {
                //console.log("Se ha creado la campaña");
                //console.log("Creando relación con proyecto ",campaign.project.id);
                resolve(createProjectRelationship(response.id,campaign.project.id, sessionId,0));
            })
            .catch((err) => reject(err));
    });
}

function getProject (link_list){
  var a = {};
  link_list.find(function(project) {
      if (project.name === process.env.CAMPAIGN_PROJECT_RELATION_NAME ) {
         a = {
          id: project.records[0].link_value.id.value,
          name: project.records[0].link_value.name.value
        };
      }
  });
  return a;
}

/**
 * Obtiene las campañas con el proyecto relacionado.
 * @param  {String} sessionId Token de la sesion en sugar.
 * @return {[type]}           [description]
 */
function getCampaigns(sessionId){
    return new Promise((resolve, reject) =>{
            //console.log("sessionId",sessionId);
            CampaignSugar.getCampaigns(sessionId,"","",0,["id","name", "start_date", "end_date","content", "campaign_type","status","budget","actual_cost","assigned_user_id"],0)
            .then((response)=>{
              var campaign = new Campaign();
              let campaigns = [];
              let entry = {};
              let link_list = [];
              for(var i =0, len  = response.entry_list.length; i< len; i++){
                entry = response.entry_list[i];
                link_list = [];
                campaign = new Campaign();
                campaign.id = entry.id;
                campaign.name= entry.name_value_list.name.value;
                if(entry.name_value_list.start_date.value != false)
                  campaign.startDate = entry.name_value_list.start_date.value;
                else
                  campaign.startDate = '';
                if(entry.name_value_list.end_date.value != false)
                  campaign.endDate = entry.name_value_list.end_date.value;
                else
                  campaign.endDate = '';
                campaign.description = entry.name_value_list.content.value;
                //Obtiene el tipo de campaña
                campaign.type = typeUtils.getTypeByName(entry.name_value_list.campaign_type.value,typeUtils.CAMPAIGNTYPES);
                //Obtiene el estado de la campaña.
                campaign.status = statesUtils.getStateByName(entry.name_value_list.status.value, statesUtils.CAMPAIGNSTATE);
                campaign.budget = entry.name_value_list.budget.value;
                campaign.actualCost =entry.name_value_list.actual_cost.value;
                //Obtener el proyecto relacionado.
                link_list =  response.relationship_list[i].link_list;
                campaign.project = getProject(link_list);

                campaigns.push(campaign);
              }
              resolve(campaigns);
            })
            .catch((err) => reject(err));
    });
}

/**
 * Actualiza la camapaña
 * @param  {Campaign} campaign  [description]
 * @param  {String} sessionId Token de la sesion
 * @param  {String} apiUserId Identificador del usuario.
 * @return {[type]}           [description]
 */
function updateCampaign(campaign,sessionId,apiUserId) {
    return new Promise((resolve, reject) => {
            if (campaign.status == "Complete")
              campaign.endDate = moment(new Date()).format("YYYY-MM-DD");
            CampaignSugar.updateCampaign(campaign,sessionId,apiUserId)
            .then((response) => {
                resolve(createProjectRelationship(response.id,campaign.project.id, sessionId,0));
            })
            .catch((err) => reject(err));
    });
}
/**
 * Elimina la campaña
 * @param  {[type]} campaign  Obtiene el id de la campaña y el proyecto para eliminar camapaña y proyecto.
 * @param  {[type]} sessionId [description]
 * @return {[type]}           [description]
 */
function deleteCampaign(campaign,sessionId) {
    return new Promise((resolve, reject) => {
            CampaignSugar.deleteCampaign(campaign,sessionId)
            .then(resolve(createProjectRelationship(campaign.id,campaign.project.id, sessionId,1)))
            .catch((err) => reject(err));
    });
}


module.exports = {
    createCampaign,
    getCampaigns,
    updateCampaign,
    deleteCampaign
};
