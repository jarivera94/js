'use strict';

const moment =  require("moment");

class Campaign {
    /**
     * [constructor description]
     * @param  {String} name        [description]
     * @param  {Date} startDate   [description]
     * @param  {Date} endDate  [description]
     * @param  {String} description [description]
     * @param  {String} type        [description]
     * @param  {String} status       [description]
     * @param  {Number} budget     [description]
     * @param  {Number} actualCost     [description]
     * @param  {String} idProject     Identificador del proyecto.
     * @return {[type]}             [description]
     */
    constructor(id, name, startDate, endDate, description, type, status, budget, actualCost, idProject) {
        this.id = id;
        this.name = name;
        this.startDate = moment(startDate).format("YYYY-MM-DD");
        this.endDate = moment(endDate).format("YYYY-MM-DD");
        this.description = description;
        this.type = type;
        this.status = status;
        this.budget = budget;
        this.actualCost = actualCost;
        this.project = {
            id: idProject
        };
    }

}

module.exports = Campaign;
