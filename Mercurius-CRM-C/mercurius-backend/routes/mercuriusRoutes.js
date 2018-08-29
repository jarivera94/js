'use strict';

const userService = require('../services/userService');
const shalom = require('../services/shalomService');
const middlewares = require('../services/middlewares');
const projectService = require('../services/ProjectService');
const campaignService = require('../services/CampaignService');
const leadService = require('../services/LeadService');
const accountService = require('../services/AccountService');
const contactService = require('../services/ContactService');
const opportunityService = require('../services/OpportunityService');
const configurationListService = require('../services/ConfigurationListService');
const activityService = require('../services/ActivityService');
const callService = require('../services/CallService');
const meetingService = require('../services/MeetingService');

module.exports = function(app) {
    // Shalom Security Service
    app.route('/api/logApi').post(userService.logInApiSugar);
    app.route('/api/getSession').get(userService.getSessionId);
    app.route('/api/login').post(middlewares.logRequest, shalom.login);

    //Project
    app.route('/api/createProject').post(projectService.createProject);
    app.route('/api/getProject').get(projectService.readProject);
    app.route('/api/deleteProject').delete(projectService.deleteProject);
    app.route('/api/updateProject').post(projectService.updateProject);

    //Campaign
    app.route('/api/createCampaign').post(campaignService.createCampaign);
    app.route('/api/getCampaigns').get(campaignService.getCampaigns);
    app.route('/api/updateCampaign').post(campaignService.updateCampaign);
    app.route('/api/deleteCampaign').delete(campaignService.deleteCampaign);
    app.route('/api/getEnumCampaign').get(campaignService.getEnumCampaign);

    //Account
    app.route('/api/createAccount').post(accountService.createAccount);
    app.route('/api/getAccounts').get(accountService.getAccounts);
    app.route('/api/updateAccount').post(accountService.updateAccount);
    app.route('/api/deleteAccount').delete(accountService.deleteAccount);
    app.route('/api/getEnumAccount').get(accountService.getEnumAccount);


    //Leads
    app.route('/api/createLead').post(leadService.createLead);
    app.route('/api/getLead').get(leadService.readLead);
    app.route('/api/deleteLead').delete(leadService.deleteLead);
    app.route('/api/updateLead').post(leadService.updateLead);
    app.route('/api/getEnumLead').get(leadService.getEnumLead);
    app.route('/api/convertLead').post(leadService.convertLead);
    app.route('/api/getLeadOpportunity').get(leadService.getLeadOpportunity);


    //Contact
    app.route('/api/createContact').post(contactService.createContact);
    app.route('/api/getContacts').get(contactService.getContacts);
    app.route('/api/updateContact').post(contactService.updateContact);
    app.route('/api/deleteContact').delete(contactService.deleteContact);
    app.route('/api/getEnumContact').get(contactService.getEnumContact);

    //Opportunity
    app.route('/api/createOpportunity').post(opportunityService.createOpportunity);
    app.route('/api/getOpportunity').get(opportunityService.readOpportunity);
    app.route('/api/updateOpportunity').post(opportunityService.updateOpportunity);
    app.route('/api/deleteOpportunity').delete(opportunityService.deleteOpportunity);
    app.route('/api/getEnumOpportunity').get(opportunityService.getEnumOpportunity);
    app.route('/api/getListApartments').get(opportunityService.listApartments);

    //ConfigurationListSugar
    app.route('/api/getListItems').get(configurationListService.getListItems);
    app.route('/api/modifyItemList').post(configurationListService.modifyItemList);
    app.route('/api/deleteItemList').post(configurationListService.deleteItemList);

    //Actvities
    app.route('/api/createActivity').post(activityService.createActivity);
    app.route('/api/modifyActivity').post(activityService.modifyActivity);

    //Calls
    app.route('/api/createCall').post(callService.createCall);
    app.route('/api/getCall').get(callService.readCall);
    app.route('/api/deleteCall').delete(callService.deleteCall);
    app.route('/api/updateCall').post(callService.updateCall);

    //Meeting
    app.route('/api/createMeeting').post(meetingService.createMeeting);
    app.route('/api/getMeeting').get(meetingService.readMeeting);
    app.route('/api/deleteMeeting').delete(meetingService.deleteMeeting);
    app.route('/api/updateMeeting').post(meetingService.updateMeeting);
};
