'use strict';

const SALESSTAGE = [{
    name: "Prospecting",
    value: "Prospecto"
  },
  {
    name: "Qualification",
    value: "Calificación"
  },
  {
    name: "Needs Analysis",
    value: "Necesita análisis"
  },
  {
    name: "Value Proposition",
    value: "Propuesta de valor"
  },
  {
    name: "Id. Decision Makers",
    value: "Id. Tomadores de decisiones"
  },
  {
    name: "Perception Analysis",
    value: "Análisis de percepción"
  },
  {
    name: "Proposal/Price Quote",
    value: "Propuesta/Presupuesto"
  },
  {
    name: "Negotiation/Review",
    value: "Negociación/Revisión"
  },
  {
    name: "Closed Won",
    value: "Ganado"
  },
  {
    name: "Closed Lost",
    value: "Perdido"
  },

];

function getStageByName(name, typeArray) {
  let typeObject = {};
  typeArray.find(function(type) {
    if (type.name === name) {
      typeObject = type;
    }
  });
  return typeObject;
}

module.exports = {
  SALESSTAGE,
  getStageByName
};
