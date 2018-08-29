'use strict';
const ContactLogic = require('../bll/ContactLogic');
const Contact = require('../cbo/Contact');
const sourceUtils = require('../utils/sources');
const typeUtils = require('../utils/types')

/**
 * Crea contacto
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function createContact(req, res) {
    var contact = new Contact(null, req.body.contact.salutation, req.body.contact.firstName, req.body.contact.lastName, req.body.contact.phoneHome, req.body.contact.phoneMobile, req.body.contact.email, req.body.contact.isMainContact, req.body.contact.Account);

    var sessionId = req.body.sugarId;
    var user_id = req.body.sugarUserId;

    return new Promise((resolve, reject) => {
        ContactLogic.modifyContact(contact,sessionId,user_id,0)
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

/**
 * Actualiza una contacto.
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function updateContact(req, res) {
    var contact = new Contact(req.body.contact.id, req.body.contact.salutation, req.body.contact.firstName, req.body.contact.lastName, req.body.contact.phoneHome, req.body.contact.phoneMobile, req.body.contact.email, req.body.contact.isMainContact, req.body.contact.Account);
    var sessionId = req.body.sugarId;
    var user_id = req.body.sugarUserId;
    //console.log(req.body);

    return new Promise((resolve, reject) => {
        ContactLogic.modifyContact(contact,sessionId,user_id,0)
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

/**
 * Eliminar contacto y relación con campaña
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function deleteContact(req, res) {
    var contactId = req.query.contactId;
    var campaignId = req.query.campaignId;
    var accountId = req.query.accountId;
    var sessionId = req.query.sugarId;
    //console.log(req.body);

    return new Promise((resolve, reject) => {
        ContactLogic.deleteContact(contactId, campaignId, accountId,sessionId)
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

/**
 * Obtiene las contactos con la camapaña y correos relacionados.
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function getContacts(req, res) {
    let sessionId = req.query.sugarId;
    return new Promise((resolve, reject) => {
        ContactLogic.getContacts(sessionId)
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

/**
 * Obtiene los enumeradores
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     Los arreglos de los enumeradores
 *                      [contactTypes,industryType,documentType]
 */
function getEnumContact(req, res) {
    console.log("profesion. ",typeUtils.PROFFESIONTYPE);
    let enumdata = {
      leadSources : sourceUtils.LEADSOURCE,
      proffesionType : typeUtils.PROFFESIONTYPE
    };

    return new Promise((resolve)=> resolve(
        res.status(200).send({
            message: enumdata
        })));
}

module.exports = {
    createContact,
    updateContact,
    deleteContact,
    getContacts,
    getEnumContact
};
