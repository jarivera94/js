'use strict';
const AccountLogic = require('../bll/AccountLogic');
const Account = require('../cbo/Account');
const typeUtils = require('../utils/types');

/**
 * Crea cuenta
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function createAccount(req, res) {
    var account = new Account(null, req.body.account.name, req.body.account.lastName, req.body.account.email, req.body.account.phone, req.body.account.address, req.body.account.description,  req.body.account.typeDocument, req.body.account.documentNumber, req.body.account.Campaign.id, req.body.account.contacts);
    //account.contacts
    var sessionId = req.body.sugarId;
    var user_id = req.body.sugarUserId;
    console.log(account);
    return new Promise((resolve, reject) => {
        AccountLogic.modifyAccount(account,sessionId,user_id,0)
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
 * Actualiza una cuenta.
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function updateAccount(req, res) {
    var account = new Account(req.body.account.id, req.body.account.name, req.body.account.lastName, req.body.account.email, req.body.account.phone, req.body.account.address, req.body.account.description,  req.body.account.typeDocument, req.body.account.documentNumber, req.body.account.Campaign.id, null);
    var sessionId = req.body.sugarId;
    var user_id = req.body.sugarUserId;
    //console.log(req.body);
    return new Promise((resolve, reject) => {
        AccountLogic.modifyAccount(account,sessionId,user_id,0)
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
 * Eliminar cuenta y relación con campaña
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function deleteAccount(req, res) {
    var accountId = req.query.accountId;
    var sessionId = req.query.sugarId;
    var campaignId = req.params.campaignId;
    return new Promise((resolve, reject) => {
        AccountLogic.deleteAccount(accountId, campaignId,sessionId)
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
 * Obtiene las cuentas con la camapaña y correos relacionados.
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function getAccounts(req, res) {
    let sessionId = req.query.sugarId;
    let validateOpConcreted = req.query.validateOpConcreted === "false" ? false : true;
    return new Promise((resolve, reject) => {
        AccountLogic.getAccounts(sessionId, validateOpConcreted)
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
 *                      [accountTypes,industryType,documentType]
 */
function getEnumAccount(req, res) {
    let enumdata = {
      accountTypes : typeUtils.ACCOUNTTYPES,
      industryTypes : typeUtils.INDUSTRYTYPES,
      documentTypes : typeUtils.DOCTYPES
    };

    return new Promise((resolve)=> resolve(
        res.status(200).send({
            message: enumdata
        })));
}

module.exports = {
    createAccount,
    updateAccount,
    deleteAccount,
    getAccounts,
    getEnumAccount
};
