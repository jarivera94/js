'use strict';
//CBO
const Lead = require('../cbo/Lead');
const Opportunity = require('../cbo/Opportunity');

//BLL
const statesUtils = require('../utils/states');
const typeUtils = require('../utils/types');
const LeadLogic = require('../bll/LeadLogic');
const OpportunityLogic = require('../bll/OpportunityLogic');
const sourceUtils = require('../utils/sources');
const LeadSugar = require('../dal/LeadSugar');

/**
 * [createLead description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function createLead(req, res) {

  var lead = new Lead();
  if(req.body.lead.campaign ==="" || req.body.lead.campaign === undefined || req.body.lead.campaign == null){
    lead.campaign.id = "";
  }else{
    lead.campaign.id = req.body.lead.campaign.id;
  };

  if(req.body.lead.salutation ==="" || req.body.lead.salutation === undefined || req.body.lead.salutation == null){
    lead.salutation = "";
  }else{
    lead.salutation = req.body.lead.salutation.value;
  };

  if(req.body.lead.customer_type ==="" || req.body.lead.customer_type === undefined || req.body.lead.customer_type == null){
    lead.customer_type = "";
  }else{
    lead.customer_type = req.body.lead.customer_type.value;
  };
  lead.firstname = req.body.lead.firstname;
  lead.lastname = req.body.lead.lastname;
  lead.phone_home = req.body.lead.phone_home;
  lead.phone_mobile = req.body.lead.phone_mobile;
  lead.description = req.body.lead.description;
  lead.date_created = req.body.lead.date_created;
  lead.email1 = req.body.lead.email1;
  lead.reviewed = req.body.lead.reviewed;
  lead.converted = req.body.lead.converted;
    var sessionId = req.body.sugarId;
    var user_id = req.body.sugarUserId;
    return new Promise((resolve, reject) => {
        LeadLogic.createLead(lead, sessionId, user_id)
            .then((response) => resolve(
                res.status(200).send({
                    message: response
                })
            )).catch((err) => reject(
                res.status(400).send({
                    message: err
                })
            ));
    });
}

function readLead(req, res) {
  let sessionId = req.query.sugarId;
   return new Promise((resolve, reject) => {
       LeadLogic.readLead(sessionId)
           .then((response) => {
               resolve(
               res.status(200).send({
                   message: response
               }));
           }
         ).catch((err) => reject(
               res.status(400).send({
                   message: err
               })
           ));

   });
}

function deleteLead(req, res) {
    var lead = new Lead();
    lead.id = req.query.leadId;
    var sessionId = req.query.sugarId;
    var user_id = req.body.sugarUserId;
    return new Promise((resolve, reject) => {
        LeadLogic.deleteLead(lead, sessionId,user_id)
            .then((response) => resolve(
                res.status(200).send({
                    message: response
                })
            )).catch((err) => reject(
                res.status(400).send({
                    message: err
                })
            ));
    });
}

function updateLead(req, res) {

    var session = req.body.sugarId;
    var lead = new Lead();
    lead.id = req.body.lead.id;
    lead.salutation = req.body.lead.salutation.value;
    lead.firstname = req.body.lead.firstname;
    lead.lastname = req.body.lead.lastname;
    lead.phone_home = req.body.lead.phone_home;
    lead.phone_mobile = req.body.lead.phone_mobile;
    lead.description = req.body.lead.description;
    lead.customer_type = req.body.lead.customer_type.value;
    lead.date_created = req.body.lead.date_created;
    lead.campaign.id = req.body.lead.campaign.id;
    lead.email1 = req.body.lead.email1;
    lead.reviewed = req.body.lead.reviewed;
    lead.converted = req.body.lead.converted;
    var sessionId = req.body.sugarId;
    var user_id = req.body.sugarUserId;
    return new Promise((resolve, reject) => {
        LeadLogic.updateLead(lead, sessionId, user_id)
            .then((response) => resolve(
                res.status(200).send({
                    message: response
                })
            )).catch((err) => reject(
                res.status(400).send({
                    message: err
                })
            ));
    });
}

function getEnumLead(req, res) {
    let enumdata = {
      statesLead : statesUtils.LEADSTATE,
      sourceLead : sourceUtils.LEADSOURCE,
    };

    return new Promise((resolve)=> resolve(
        res.status(200).send({
            message: enumdata
        })));
}



function convertLead(req, res) {

  var lead = new Lead();
  var opportunity = new Opportunity();

  if(req.body.lead.campaign ==="" || req.body.lead.campaign === undefined || req.body.lead.campaign == null){
    lead.campaign.id = "";
  }else{
    lead.campaign.id = req.body.lead.campaign.id;
  };

  if(req.body.lead.salutation ==="" || req.body.lead.salutation === undefined || req.body.lead.salutation == null){
    lead.salutation = "";
    opportunity.salutation = "";
  }else{
    lead.salutation = req.body.lead.salutation.value;
    opportunity.salutation = req.body.lead.salutation.value;
  };

  if(req.body.lead.customer_type ==="" || req.body.lead.customer_type === undefined || req.body.lead.customer_type == null){
    lead.customer_type = "";
  }else{
    lead.customer_type = req.body.lead.customer_type.value;
  };

  if(req.body.opportunity.account.name ==="" || req.body.opportunity.account.name === undefined || req.body.opportunity.account.name == null){
    opportunity.account = "";
  }else{
    opportunity.account.name = req.body.opportunity.account.name;
    opportunity.account.lastName = req.body.opportunity.account.lastName;
    opportunity.account.phone = req.body.opportunity.account.phone;
    opportunity.account.address = req.body.opportunity.account.address;
    opportunity.account.description = req.body.opportunity.account.description;
    opportunity.account.typeDocument = req.body.opportunity.account.typeDocument;
    opportunity.account.documentNumber = req.body.opportunity.account.documentNumber;
    opportunity.account.email1 = req.body.opportunity.account.email1;
  };

  lead.firstname = req.body.lead.firstname;
  lead.lastname = req.body.lead.lastname;
  lead.phone_home = req.body.lead.phone_home;
  lead.phone_mobile = req.body.lead.phone_mobile;
  lead.description = req.body.lead.description;
  lead.date_created = req.body.lead.date_created;
  lead.email1 = req.body.lead.email1;
  lead.reviewed = req.body.lead.reviewed;
  lead.converted = req.body.lead.converted;
  opportunity.name = req.body.opportunity.name;
  opportunity.lastName = req.body.opportunity.lastName;
  opportunity.description = req.body.opportunity.description;
  opportunity.email = req.body.opportunity.email;
  opportunity.negotiation = req.body.opportunity.negotiation;
  opportunity.apartments = req.body.opportunity.apartments;
  opportunity.salesStage = req.body.opportunity.salesStage;
  opportunity.probability = req.body.opportunity.probability;
  opportunity.isnaturalperson = req.body.opportunity.isnaturalperson;
  opportunity.campaign.id = lead.campaign.id;
    var sessionId = req.body.sugarId;
    var user_id = req.body.sugarUserId;
    console.log("sessionId",sessionId);

//verifica si esta creado o no para crear el lead y la oportunidad
  if(req.body.lead.id  ==="" || req.body.lead.id === undefined || req.body.lead.id == null){
      return new Promise((resolve, reject) => {
        OpportunityLogic.createOpportunity(opportunity, sessionId, user_id)
          .then((response) => {
              let idLead = response.id;
              lead.opportunity.id = idLead;
              resolve(LeadSugar.createLead(lead, sessionId, user_id).then(
                (response) => {
                    resolve(
                    res.status(200).send({
                        message: response
                    }));
                  }
              ).catch());
            }

          ).catch((err) => reject(
            res.status(400).send({
              message: err
            })
          ));
      });
  }else{//si Ya esta creado solo crea la oportunidad de acuerdo a los campos del lead
    lead.id = req.body.lead.id;
    return new Promise((resolve, reject) => {
      OpportunityLogic.createOpportunity(opportunity, sessionId, user_id)
        .then((response) => {
            let idLead = response.id;
            lead.opportunity.id = idLead;
            resolve(LeadSugar.updateLead(lead, sessionId, user_id).then(
              (response) => {
                  resolve(
                  res.status(200).send({
                      message: response
                  }));
                }
            ).catch());
          }
        ).catch((err) => reject(
          res.status(400).send({
            message: err
          })
        ));
    });
  }
}

function readLead(req, res) {
  let sessionId = req.query.sugarId;
   return new Promise((resolve, reject) => {
       LeadLogic.readLead(sessionId)
           .then((response) => {
               resolve(
               res.status(200).send({
                   message: response
               }));
           }
         ).catch((err) => reject(
               res.status(400).send({
                   message: err
               })
           ));

   });
}

function getLeadOpportunity(req, res) {
  let sessionId = req.query.sugarId;
  let idOpportunity = req.query.idOpportunity;
   return new Promise((resolve, reject) => {
       LeadLogic.getLeadOpportunity(idOpportunity, sessionId)
           .then((response) => {
               resolve(
               res.status(200).send({
                   message: response
               }));
           }
         ).catch((err) => reject(
               res.status(400).send({
                   message: err
               })
           ));

   });
}
module.exports = {
  createLead,
  readLead,
  deleteLead,
  updateLead,
  getEnumLead,
  convertLead,
  getLeadOpportunity
};
