'use strict';

const LEADSOURCE = [{
  name :"Cold Call",
  value : "Llamada en frío"
},{
  name :"Existing Customer",
  value : "Cliente existente"
},{
  name :"Self Generated",
  value : "Auto Generado"
},{
  name :"Employee",
  value : "Empleado"
},{
  name :"Partner",
  value : "Partner"
},{
  name :"Public Relations",
  value : "Relaciones Publicas"
},{
  name :"Direct Mail",
  value : "Correo Directo"
},{
  name :"Conference",
  value : "Conferencia"
},{
  name :"Trade Show",
  value : "Exposición"
},{
  name :"Web Site",
  value : "Sitio web"
},{
  name :"Word of mouth",
  value : "Recomendación"
},{
  name :"Email",
  value : "Email"
},{
  name :"Campaign",
  value : "Campaña"
},{
  name :"Other",
  value : "Otro"
}
];

function getSourceByName(name, sourceArray) {
  let sourceObject = {};
  sourceArray.find(function(source) {
    if (source.name === name) {
      sourceObject = source;
    }
  });
  return sourceObject;
}

module.exports = {
  LEADSOURCE,
  getSourceByName
};
