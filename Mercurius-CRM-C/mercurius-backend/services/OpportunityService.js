'use strict';
//CBO
const Opportunity = require('../cbo/Opportunity');

//BLL
const statesUtils = require('../utils/states');
const typeUtils = require('../utils/types');
const OpportunityLogic = require('../bll/OpportunityLogic');
const sourceUtils = require('../utils/sources');
const stageUtils = require('../utils/stage');

/**
 * [createLead description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function createOpportunity(req, res) {

    var opportunity = new Opportunity();
    if(req.body.opportunity.campaign ==="" || req.body.opportunity.campaign === undefined || req.body.opportunity.campaign == null){
      opportunity.campaign.id = "";
    }else{
      opportunity.campaign.id = req.body.opportunity.campaign.id;
    };
    if(req.body.opportunity.account ==="" || req.body.opportunity.account === undefined || req.body.opportunity.account == null){
      opportunity.account.id = "";
    }else{
      opportunity.account.name = req.body.opportunity.account.name;
      opportunity.account.phone = req.body.opportunity.account.phone;
      opportunity.account.industry = req.body.opportunity.account.industry;
      opportunity.account.typeDocument = req.body.opportunity.account.typeDocument;
      opportunity.account.documentNumber = req.body.opportunity.account.documentNumber;
      opportunity.account.email1 = req.body.opportunity.account.email1;
      opportunity.account.type = req.body.opportunity.account.type;
    };

    opportunity.salutation = req.body.opportunity.salutation;
    opportunity.name = req.body.opportunity.name;
    opportunity.lastName = req.body.opportunity.lastName;
    opportunity.description = req.body.opportunity.description;
    opportunity.email = req.body.opportunity.email;
    opportunity.negotiation = req.body.opportunity.negotiation;
    opportunity.apartments = req.body.opportunity.apartments;
    opportunity.salesStage = req.body.opportunity.salesStage;
    opportunity.probability = req.body.opportunity.probability;
    opportunity.isnaturalperson = req.body.opportunity.isnaturalperson;
    var sessionId = req.body.sugarId;
    var user_id = req.body.sugarUserId;
    return new Promise((resolve, reject) => {
        OpportunityLogic.createOpportunity(opportunity, sessionId, user_id)
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

function readOpportunity(req, res) {
  let sessionId = req.query.sugarId;
  //let sessionId = "pitnj8usnmmfg6j39ue81k2i85";
   return new Promise((resolve, reject) => {
       OpportunityLogic.readOpportunity(sessionId)
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

function deleteOpportunity(req, res) {
    var opportunity = new Opportunity();
    opportunity.id = req.query.opportunityId;
    var sessionId = req.query.sugarId;

    var user_id = req.body.sugarUserId;
    return new Promise((resolve, reject) => {
        OpportunityLogic.deleteOpportunity(opportunity, sessionId,user_id)
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

function updateOpportunity(req, res) {

    var session = req.body.sugarId;
    var opportunity = new Opportunity();

    if(req.body.opportunity.campaign ==="" || req.body.opportunity.campaign === undefined || req.body.opportunity.campaign == null){
      opportunity.campaign.id = "";
    }else{
      opportunity.campaign.id = req.body.opportunity.campaign.id;
    };
    if(req.body.opportunity.account ==="" || req.body.opportunity.account === undefined || req.body.opportunity.account == null){
      opportunity.account.id = "";
    }else{
      opportunity.account.id = req.body.opportunity.account.id;
    };
    opportunity.id = req.body.opportunity.id;
    opportunity.salutation = req.body.opportunity.salutation;
    opportunity.name = req.body.opportunity.name;
    opportunity.lastName = req.body.opportunity.lastName;
    opportunity.description = req.body.opportunity.description;
    opportunity.email = req.body.opportunity.email;
    opportunity.negotiation = req.body.opportunity.negotiation;
    opportunity.apartments = req.body.opportunity.apartments;
    opportunity.salesStage = req.body.opportunity.salesStage;
    opportunity.probability = req.body.opportunity.probability;
    opportunity.isnaturalperson = req.body.opportunity.isnaturalperson;
    opportunity.project.id = req.body.opportunity.project.id;
    var sessionId = req.body.sugarId;
    var user_id = req.body.sugarUserId;
    return new Promise((resolve, reject) => {
        OpportunityLogic.updateOpportunity(opportunity, sessionId, user_id)
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

function getEnumOpportunity(req, res) {
    let enumdata = {
      sourceLead : sourceUtils.LEADSOURCE,
      salesStageOpportunity : stageUtils.SALESSTAGE
    };

    return new Promise((resolve)=> resolve(
        res.status(200).send({
            message: enumdata
        })));
}

function listApartments(req, res) {
  let sessionId = req.query.sugarId;
  let campaignId = req.query.campaignId;
   return new Promise((resolve, reject) => {
       OpportunityLogic.listApartments(sessionId,campaignId)
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
  createOpportunity,
  readOpportunity,
  deleteOpportunity,
  updateOpportunity,
  getEnumOpportunity,
  listApartments
};
