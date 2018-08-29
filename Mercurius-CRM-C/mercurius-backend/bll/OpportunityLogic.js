'use strict';
const Opportunity = require('../cbo/Opportunity');
const OpportunitySugar = require('../dal/OpportunitySugar');
const AccountLogic = require('../bll/AccountLogic');
const Account = require('../cbo/Account');
const sourceUtils = require('../utils/sources');
const stageUtils = require('../utils/stage');
/**
 * Método que se encarga de llamar a la capa del DAL enviando el objeto de tipo usuario con el usuario y contraseña para
 * hacer la petición contra la url de sugar API
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
function createOpportunity(opportunity, sessionId, apiUserId) {
  let idAccount;
  var account = new Account();
  if (opportunity.isnaturalperson == 1) {
    account.name = opportunity.name +" "+opportunity.lastName;
    account.Campaign.id = opportunity.campaign.id;
  } else {
    account.name = opportunity.account.name;
    account.lastName = opportunity.account.lastName;
    account.phone = opportunity.account.phone;
    account.address = opportunity.account.address;
    account.description = opportunity.account.description;
    account.typeDocument = opportunity.account.typeDocument;
    account.documentNumber = opportunity.account.documentNumber;
    account.email1 = opportunity.account.email1;
    account.Campaign.id = opportunity.campaign.id;
  }
  return new Promise((resolve, reject) => {
    //console.log("hizo la peticion");
    AccountLogic.modifyAccount(account, sessionId, apiUserId, 0)
      .then((response) => {
          idAccount = response.idAccount;
          opportunity.account.id = idAccount;
          resolve(OpportunitySugar.createOpportunity(opportunity, sessionId, apiUserId));
        }

      ).catch((err) => reject(
        res.status(400).send({
          message: err
        })
      ));

  });
}

function deleteOpportunity(opportunity, sessionId, apiUserId) {
  return new Promise((resolve, reject) => {
    OpportunitySugar.deleteOpportunity(opportunity, sessionId, apiUserId)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => reject(err));
  });
}

function updateOpportunity(opportunity, sessionId, apiUserId) {
  return new Promise((resolve, reject) => {
    OpportunitySugar.updateOpportunity(opportunity, sessionId, apiUserId)
      .then((response) => {
        resolve(response.id);
      })
      .catch((err) => reject(err));
  });
}


/**
 * Obtiene la campaña relacionada a una cuenta
 * @param  {[type]} link_list Objeto de lista que devuelve sugar con las relaciones
 * @return {[type]}           Objeto  con id y nombre de la camapaña
 */
 function getrelatedCampaign(link_list) {
   let campaign = {};
   //console.log("CAMPAÑASS!!!!!!!!");
   link_list.find(function(relatedBean) {
     if (relatedBean.name === "campaign_opportunities") {
       campaign = {
         id: relatedBean.records[0].link_value.id.value,
         name: relatedBean.records[0].link_value.name.value
       };
     }
   });
   return campaign;
 }

 function getrelatedAccount(link_list) {
   let account = {};
   link_list.find(function(relatedBean) {
     if (relatedBean.name === "accounts") {
       account = {
         id: relatedBean.records[0].link_value.id.value,
         name: relatedBean.records[0].link_value.name.value,
         phone: relatedBean.records[0].link_value.phone.value,
         industry: relatedBean.records[0].link_value.industry.value,
         typeDocument: relatedBean.records[0].link_value.typeDocument.value,
         email1: relatedBean.records[0].link_value.email1.value,
         documentNumber: relatedBean.records[0].link_value.documentNumber.value,
         type: relatedBean.records[0].link_value.type.value
       };
     }
   });
   return account;
 }


 function getrelatedProject(idCampaign, sessionId) {
   return new Promise((resolve, reject) => {
     if(idCampaign==="" || idCampaign === undefined){
       let project = {
         id:"",
         name: ""
       };
       resolve(project);
     }else{
     OpportunitySugar.readCampaignProject(idCampaign, sessionId)
       .then((response) => {
         //console.log("response", response);
         let project = {
           id: response.relationship_list[0][0].records[0].id.value,
           name: response.relationship_list[0][0].records[0].name.value
         };
         resolve(project);
       }).catch((err) => reject(err));
     }
   });
 }

function readOpportunity(sessionId, apiUserId) {
  return new Promise((resolve, reject) => {
    OpportunitySugar.readOpportunity(sessionId, apiUserId)
      .then((response) => {
        let opportunities = [];
        let listdata = response.entry_list;
        //var data = {};
        let link_list = [];
        let i;
        let promises = [];
        let oportunityObjectPromise = function(resolve, reject) {
          var opportunity = new Opportunity();
          var data = listdata[i].name_value_list;
          opportunity.id = data.id.value;
          opportunity.salutation = data.salutation_c.value;
          opportunity.name = data.name.value;
          opportunity.lastName = data.lastname_c.value;
          opportunity.description = data.description.value;
          opportunity.email = data.email_c.value;
          opportunity.negotiation = data.negotiation_c.value;
          opportunity.apartments = data.apartamentos_c.value;
          opportunity.salesStage =  data.sales_stage.value;
          opportunity.probability = data.probability.value;
          opportunity.isnaturalperson = data.isnaturalperson_c.value;
          link_list = response.relationship_list[i].link_list;
          opportunity.account = getrelatedAccount(link_list);
          opportunity.campaign = getrelatedCampaign(link_list);
          getrelatedProject(opportunity.campaign.id, sessionId).then((project) => {
            opportunity.project = project;
            resolve(opportunity);
          }).catch((err) => {
            reject(err);
          });
        }
        for (i = 0; i < listdata.length; i++) {
          promises.push(new Promise(oportunityObjectPromise));
        }

        Promise.all(promises).then((opportunities) => {
          //console.log("opportunity final");
          resolve(opportunities);
        }).catch((err) => {
          //console.log("err promise2", err);
          reject(err);
        })
      }).catch((err) => reject(err));
  });
}

function listApartments(sessionId, idCampaign) {
  return new Promise((resolve, reject) => {
    let usedDepartments = [];
    OpportunitySugar.readOpportunityApartments(sessionId, idCampaign)
      .then((response) => {
        console.log(JSON.stringify(response));
      let listdata = response.entry_list;
      for (i = 0; i < listdata.length; i++) {
        if(listdata[i].name_value_list.apartamentos_c.value != ''){//si no esta vacio
          if(listdata[i].name_value_list.apartamentos_c.value.indexOf(',') != -1){//si tiene comas
              var arrayDeCadenas = listdata[i].name_value_list.apartamentos_c.value.split(",");
              for (j = 0; j < arrayDeCadenas.length; j++) {
                usedDepartments.push(arrayDeCadenas[j]);
              }
          }else{//si no tiene comas
            usedDepartments.push(listdata[i].name_value_list.apartamentos_c.value);
          }
        }
      };

      console.log(JSON.stringify(usedDepartments));

    let apartments = [];
    for(var i = 2; i<=6;i++){
      for(var j = 1; j<=8;j++){
        var department = "Apartamento "+i+"0"+j;
        if(usedDepartments.indexOf(department)<= -1){
            apartments.push(department);
        }
      }
    }
    resolve(apartments);
  }).catch((err) => reject(err));
});
}

module.exports = {
  createOpportunity,
  readOpportunity,
  deleteOpportunity,
  updateOpportunity,
  listApartments
};
