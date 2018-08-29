'use strict';

class Opportunity {
  /**
   * [constructor de la clase system]
   * @param  {String}  id                 [description]
   * @param  {String}  name               [description]
   * @param  {String}  amount            [description]
   * @param  {String}  salesStage         [description]
   * @param  {String}  probability        [description]
   * @param  {String}  nextStep           [description]
   * @param  {Date}    dateClosed         [description]
   * @param  {String}  idAccount          [description]
   * @param  {String}  idCampaign         [description]
   */
   constructor(salutation, name, lastName, description, email, negotiation, apartments, salesStage, probability, project, idCampaign, account) {
     this.salutation = salutation;
     this.name = name;
     this.lastName = lastName;
     this.description = description;
     this.email = email;
     this.negotiation = negotiation;
     this.apartments = apartments;
     this.salesStage = salesStage;
     this.probability = probability;
     this.project = {project};
     this.campaign = {id: idCampaign};
     this.account = {account};
   }
}

module.exports = Opportunity;
