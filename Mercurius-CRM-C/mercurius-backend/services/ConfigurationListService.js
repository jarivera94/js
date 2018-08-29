'use strict';
const configurationListLogic = require('../bll/ConfigurationListLogic');

function getListItems(req, res) {
    let sessionId = req.query.sugarId;
    let module = req.query.module;
    return new Promise((resolve, reject) => {
        configurationListLogic.getListItems(sessionId, module)
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

function modifyItemList(req, res) {
    let sessionId = req.body.sugarId;
    let list_name = req.body.list_name;
    let item_key = req.body.item_key;
    let item_value = req.body.item_value;
    return new Promise((resolve, reject) => {
        configurationListLogic.modifyItemList(sessionId, list_name, item_key, item_value )
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

function deleteItemList(req, res) {
    let sessionId = req.body.sugarId;
    let list_name = req.body.list_name;
    let item_key = req.body.item_key;
    return new Promise((resolve, reject) => {
        configurationListLogic.deleteItemList(sessionId, list_name, item_key)
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
    getListItems,
    modifyItemList,
    deleteItemList
};
