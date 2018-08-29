'use strict';

class Lead {
  /**
   * [constructor de la clase system]
   * @param  {String}  id                [description]
   * @param  {String}  salutation        [description]
   * @param  {String}  firstname         [description]
   * @param  {String}  lastname          [description]
   * @param  {String}  title             [description]
   * @param  {String}  phone             [description]
   * @param  {[]}      emails             [description]
   * @param  {String}  description       [description]
   * @param  {String}  status            [description]
   * @param  {String}  leadSource        [description]
   * @param  {String}  idCampaign        [description]
   * @param  {Number}  doNotCall         [description]
  * @return {[type]}                     [description]
   */
  constructor(salutation,firstname,lastname,title, phone, description, status, leadSource, idCampaign, doNotCall, emails, opportunity) {
    this.salutation = salutation;
    this.firstname = firstname;
    this.lastname = lastname;
    this.title = title;
    this.phone = phone;
    this.description = description;
    this.status = status;
    this.leadSource = leadSource;
    this.campaign = {id: idCampaign};
    this.doNotCall = doNotCall;
    this.emails = emails;
    this.opportunity = {opportunity};
  }
}

module.exports = Lead;
