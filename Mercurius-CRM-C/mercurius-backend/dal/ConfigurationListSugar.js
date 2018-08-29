'use strict';

const request = require('request-promise');

function modifyItemList (sessionId, list_name, item_key, item_value)
{
    let listData = {
        session: sessionId,
        list_name: list_name,
        item_key: item_key,
        item_value : item_value,
        lang : process.env.SUGAR_LANGUAJE
    };
    console.log(listData);
    let options = {
        method: 'POST',
        url: process.env.APICUSTOM, // Variable configurada en archivo .env (variables de entorno)
        form: {
            method: "DropDownEditorAdd",
            input_type: "JSON",
            response_type: "JSON",
            rest_data: JSON.stringify(listData)
        }
    };
    return new Promise((resolve, reject) => {
        request(options)
            .then((response) => resolve(JSON.parse(response)))
            .catch((err) => reject(err));
    });
}
function deleteItemList (sessionId, list_name, item_key)
{
    let listData = {
        session: sessionId,
        list_name: list_name,
        item_key: item_key,
        lang : process.env.SUGAR_LANGUAJE
    };
    let options = {
        method: 'POST',
        url: process.env.APICUSTOM, // Variable configurada en archivo .env (variables de entorno)
        form: {
            method: "DropDownKeyValueRemove",
            input_type: "JSON",
            response_type: "JSON",
            rest_data: JSON.stringify(listData)
        }
    };
    return new Promise((resolve, reject) => {
        request(options)
            .then((response) => resolve(JSON.parse(response)))
            .catch((err) => reject(err));
    });
}
function getListItems (sessionId, list_names)
{

    let listData = {
        session: sessionId,
        list_names: list_names,
        lang : process.env.SUGAR_LANGUAGE
    };
    //console.log("pet: ",JSON.stringify(listData));
    let options = {
        method: 'POST',
        url: process.env.APICUSTOM, // Variable configurada en archivo .env (variables de entorno)
        form: {
            method: "getDropDownsListsLang",
            input_type: "JSON",
            response_type: "JSON",
            rest_data: JSON.stringify(listData)
        }
    };
    //console.log("options: ",JSON.stringify(listData));
    return new Promise((resolve, reject) => {
        request(options)
            .then((response) =>
            resolve(JSON.parse(response)))
            .catch((err) => reject(err));
    });
}

module.exports = {
    modifyItemList,
    deleteItemList,
    getListItems
};
