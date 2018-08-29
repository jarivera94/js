'use strict';

const CAMPAIGNSTATE = [{
    name: "Planning",
    value: "Planeando"
  },
  {
    name: "Active",
    value: "Activo"
  },
  {
    name: "Inactive",
    value: "Inactivo"
  },
  {
    name: "Complete",
    value: "Completo"
  },
  {
    name: "In Queue",
    value: "En cola"
  },
  {
    name: "Sending",
    value: "Enviando"
  }

];

const LEADSTATE = [{
    name: "New",
    value: "Nuevo"
  },{
    name: "Assigned",
    value: "Asignado"
  },{
    name: "In Process",
    value: "En proceso"
  },{
    name: "Converted",
    value: "Convertido"
  },
  {
    name: "Recycled",
    value: "Reciclado"
  },
  {
    name: "Dead",
    value: "Muerto"
  },
];


async function getStateByName(name, stateArray) {
  let stateObject = {};
  stateArray.find(function(state) {
    if (state.name === name) {
      stateObject = state;
    }
  });
  return stateObject;
}

function getLeadStateByName(name, stateArray) {
  let stateObject = {};
  stateArray.find(function(state) {
    if (state.name === name) {
      stateObject = state;
    }
  });
  return stateObject;
}

module.exports = {
  CAMPAIGNSTATE,
  getStateByName,
  LEADSTATE,
  getLeadStateByName

};
