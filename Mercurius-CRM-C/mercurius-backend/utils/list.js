'use strict';

const LIST_NAMES =[
  {sugarName: "campaign_type_dom", name : "CampaingType"},
  {sugarName: "campaign_status_dom", name : "CampaingState"},
  {sugarName: "salutation_dom", name : "Saludo"},
  {sugarName: "lead_status_dom", name : "LeadState"},
  {sugarName: "lead_source_dom", name : "LeadSource"},
  {sugarName: "DocType_list", name : "DocumentType"},
  {sugarName: "account_type_dom", name : "AccountType"},
  {sugarName: "industry_dom", name : "IndustryType"},
  {sugarName: "Profession_list", name : "ProffesionType"},
  {sugarName: "Subject_list", name : "SubjectList"},
  {sugarName: "task_priority_dom ", name : "PriorityTask"},
  {sugarName: "task_status_dom ", name : "StatusTask"},
  {sugarName: "tipo_cliente_list", name : "CustomerType" },
  {sugarName: "state_sale", name : "StateSale" }
];
const MODULE_LIST = [{
    sugarModule: "Campaigns",
    sugarList: ["campaign_type_dom", "campaign_status_dom"]
  },{
    sugarModule: "Accounts",
    sugarList: ["account_type_dom", "industry_type_dom", "industry_type_dom"]
  },{
    sugarModule: "Contacts",
    sugarList: ["lead_source_dom", "salutation_dom"]
  },{
    sugarModule: "Leads",
    sugarList: ["lead_status_dom", "lead_source_dom", "salutation_dom", "tipo_cliente_list"]
  },{
    sugarModule: "Opportunities",
    sugarList: ["salutation_dom", "state_sale"]
  },{
    sugarModule: "Tasks",
    sugarList: ["Subject_list", "task_priority_dom", "task_status_dom"]
  }
];

function getListsugarnamebyName(name) {
  var sugarName = "" ;
    LIST_NAMES.find(function(source) {
    if (source.name === name) {
      sugarName = source.sugarName;
    }
  });
  return sugarName;
}
function getListnamebySugarname(sugarName) {
    var name = "" ;
    LIST_NAMES.find(function(source) {
    if (source.sugarName === sugarName) {
      name = source.name;
    }
  });
  return name;
}
function getModuleListNames(module){
  let values = [];
  MODULE_LIST.find(function(source) {
    if (source.sugarModule === module) {
      values = source.sugarList;
    }
  });
  if(values.length == 0)
    for (var i =0; i< LIST_NAMES.length; i++) {
      values.push(LIST_NAMES[i].sugarName);
    }
  return values;
}

module.exports = {
  LIST_NAMES,
  MODULE_LIST,
  getListsugarnamebyName,
  getListnamebySugarname,
  getModuleListNames
};
