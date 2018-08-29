'use strict';
//CBO
const Campaign = require('../cbo/Campaign');

//BLL
const CampaignLogic = require('../bll/CampaignLogic');
const statesUtils = require('../utils/states');
const typeUtils = require('../utils/types');
/**
 * [createCampaign description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function createCampaign(req, res) {
    //console.log("createCampaign", req.body);
    var campaign = new Campaign(null,req.body.campaign.name, req.body.campaign.startDate, req.body.campaign.endDate, req.body.campaign.description, req.body.campaign.type, req.body.campaign.status, req.body.campaign.budget, req.body.campaign.actualCost, req.body.campaign.project.id );
    var sessionId = req.body.sugarId;
    var user_id = req.body.sugarUserId;

    return new Promise((resolve, reject) => {
        CampaignLogic.createCampaign(campaign, sessionId,user_id)
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

function getCampaigns(req, res) {

    let sessionId = req.query.sugarId;

    //let user_id = req.query.sugarUserId;

    return new Promise((resolve, reject) => {
        CampaignLogic.getCampaigns(sessionId)
            .then((response) =>{
              resolve(
                res.status(200).send({
                    message: response
                })
              );
        }).catch((err) => reject(
                res.status(400).send({
                    message: err
                })
            ));

    });
}


function updateCampaign(req, res){
  var campaign = new Campaign(req.body.campaign.id,req.body.campaign.name, req.body.campaign.startDate, req.body.campaign.endDate, req.body.campaign.description, req.body.campaign.type, req.body.campaign.status, req.body.campaign.budget, req.body.campaign.actualCost, req.body.campaign.project.id);
  var sessionId = req.body.sugarId;
  var user_id = req.body.sugarUserId;

  return new Promise((resolve, reject) => {
      CampaignLogic.updateCampaign(campaign,sessionId,user_id)
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

function deleteCampaign(req, res) {
  var campaign = new Campaign();
  var sessionId = req.query.sugarId;
  console.log("params", req.params);
  console.log("query", req.query);
  campaign.id = req.query.campaignId;

  return new Promise((resolve, reject) => {
      CampaignLogic.deleteCampaign(campaign,  sessionId)
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
  function getEnumCampaign(req, res) {
      let enumdata = {
        typesCampaigns : typeUtils.CAMPAIGNTYPES,
        statesCampaigns : statesUtils.CAMPAIGNSTATE
      };

      return new Promise((resolve)=> resolve(
          res.status(200).send({
              message: enumdata
          })));
  }

module.exports = {
  createCampaign,
  getCampaigns,
  updateCampaign,
  deleteCampaign,
  getEnumCampaign
};
