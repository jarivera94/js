'use strict';

const CAMPAIGNTYPES = [{
    name: "Telesales",
    value: "Televenta"
  },
  {
    name: "Mail",
    value: "Correo"
  },
  {
    name: "Email",
    value: "Correo electronico"
  },
  {
    name: "Print",
    value: "Imprenta"
  },
  {
    name: "Web",
    value: "Web"
  },
  {
    name: "Radio",
    value: "Radio"
  },
  {
    name: "Television",
    value: "Televisión"
  },
  {
    name: "NewsLetter",
    value: "Periódico"
  },
  {
    name: "Ballon",
    value: "Globo"
  },

];

const DOCTYPES = [{
    name: "NIT",
    value: "Nit"
  },{
    name: "CC",
    value: "Cédula de Ciudadanía."
  },{
    name: "CE",
    value: "Cédula de Extranjería"
  },
];

const ACCOUNTTYPES = [{
      name : "Analyst",
      value : "Analista"
  },{
      name : "Competitor",
      value : "Competidor"
  },{
      name : "Customer",
      value : "Cliente"
  },{
      name : "Integrator",
      value : "Integrador"
  },{
      name : "Investor",
      value : "Inversor"
  },{
      name : "Partner",
      value : "Partner"
  },{
      name : "Press",
      value : "Prensa"
  },{
      name : "Prospect",
      value : "Prospecto"
  },{
      name : "Reseller",
      value : "Revendedor"
  },{
      name : "Other",
      value : "Otro"
  }
];

const INDUSTRYTYPES = [{
      name : "Apparel",
      value : "Textil"
  },{
    name : "Banking",
    value : "Banca"
  },{
    name : "Biotechnology",
    value : "Biotecnología"
  },{
    name : "Chemicals",
    value : "Química"
  },{
    name : "Communications",
    value : "Comunicaciones"
  },{
    name : "Construction",
    value : "Construcción"
  },{
    name : "Consulting",
    value : "Consultoria"
  },{
    name : "Education",
    value : "Educación"
  },{
    name : "Electronics",
    value : "Electronicos"
  },{
    name : "Energy",
    value : "Energía"
  },{
    name : "Engineering",
    value : "Ingeniería"
  },{
    name : "Entertainment",
    value : "Entretenimiento"
  },{
    name : "Environmental",
    value : "Medio ambiente"
  },{
    name : "Finance",
    value : "Finanzas"
  },{
    name : "Government",
    value : "Gobierno"
  },{
    name : "Healthcare",
    value : "Sanidad"
  },{
    name : "Hospitality",
    value : "Caridad"
  },{
    name : "Insurance",
    value : "Seguros"
  },{
    name : "Machinery",
    value : "Maquinaria"
  },{
    name : "Manufacturing",
    value : "Fabricación"
  },{
    name : "Media",
    value : "Medios de comunicación"
  },{
    name : "Not For Profit",
    value : "Sin ánimo de lucro"
  },{
    name : "Recreation",
    value : "Recreación"
  },{
    name : "Retail",
    value : "Minoristas"
  },{
    name : "Shipping",
    value : "Envíos"
  },{
    name : "Technology",
    value : "Tecnología"
  },{
    name : "Telecommunications",
    value : "Telecommunicaciones"
  },{
    name : "Transportation",
    value : "Transportación"
  },{
    name : "Utilities",
    value : "Utilidades"
  },{
    name : "Other",
    value : "Otro"
}];

const SALESSTAGETYPES = [{
    name: "Prospecting",
    value: "Prospecto"
  },{
    name: "Qualification",
    value: "Calificación"
  },{
    name: "Needs Analysis",
    value: "Necesita análisis"
  },{
    name: "Value Proposition",
    value: "Propuesta de valor"
  },{
    name: "Id. Desicion Markers",
    value: "Marcador de desición"
  },{
    name: "Perception Analysis",
    value: "Análisis de percepción"
  },{
    name: "Proposal/Price Quote",
    value: "Propuesta/Presupuesto de precios"
  },{
    name: "Negotiation/Review",
    value: "Negociación/Revisión"
  },{
    name: "Closed Won",
    value: "Cerrado ganado"
  },{
    name: "Closed Lost",
    value: "Cerrado perdido"
  }
];

const PROFFESIONTYPE = [
  {name : "Engineer" , value : "Ingeniero"},
  {name : "Doctor" , value : "Medico"},
  {name : "Architect" , value : "Arquitecto"},
  {name : "Published" , value : "Publicista"},
  {name : "Economist" , value : "Economista"},
  {name : "Proffesor" , value : "Profesor"},
  {name : "Lawyer" , value : "Abogado"}
];

async function getTypeByName(name, typeArray) {
  let typeObject = {};
  typeArray.find(function(type) {
    if (type.name === name) {
      typeObject = type;
    }
  });
  return typeObject;
}

module.exports = {
  CAMPAIGNTYPES,
  DOCTYPES,
  ACCOUNTTYPES,
  INDUSTRYTYPES,
  PROFFESIONTYPE,
  getTypeByName
};
