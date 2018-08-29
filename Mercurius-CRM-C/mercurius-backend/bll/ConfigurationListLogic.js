'use strict';
//Instancia a los metodos que se invocan a sugar.
const configurationListSugar = require('../dal/ConfigurationListSugar');
const listUtils = require('../utils/list');

function getListItems (sessionId, module_name){
  let lists = listUtils.getModuleListNames(module_name);
  return new Promise((resolve, reject) =>{
          configurationListSugar.getListItems(sessionId,lists)
          .then((response)=> {
            //console.log("llego abajo response",response);
              let lists = {};
              let list = {};
              var toDelete = "";
              //console.log("res: ",JSON.stringify(response));
              for (var propListName in response) {
                if (propListName != ""){
                  var name = listUtils.getListnamebySugarname(propListName);
                  list = response[propListName];
                  var lista = [];
                  for(var ppname in list){
                    var item ={}
                    if(ppname != ""){
                      item.name = ppname;
                      item.value = list[ppname];
                      lista.push(item);
                    }
                    };
                    console.log(lista);
                  if(list != undefined){
                    delete list[`${toDelete}`];
                    lists[name] = lista;
                  }

                }
              }
              resolve(lists);})
          .catch((err) => reject(err));
  });
}

function deleteItemList (sessionId, list_name, item_key){
  list_name = listUtils.getListsugarnamebyName(list_name);
  return new Promise((resolve, reject) =>{
          configurationListSugar.deleteItemList(sessionId,list_name, item_key)
          .then((response)=> {
              resolve(response);})
          .catch((err) => reject(err));
  });
}
function modifyItemList (sessionId, list_name, item_key, item_value){
  list_name = listUtils.getListsugarnamebyName(list_name);
  console.log(list_name);
  return new Promise((resolve, reject) =>{
          configurationListSugar.modifyItemList(sessionId,list_name, item_key, item_value)
          .then((response)=> {
              resolve(response);})
          .catch((err) => reject(err));
  });
}


module.exports = {
  getListItems,
  deleteItemList,
  modifyItemList
};
