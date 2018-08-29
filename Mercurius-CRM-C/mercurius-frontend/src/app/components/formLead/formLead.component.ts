import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Lead } from '../../models/lead';
import { Campaign } from '../../models/campaign';
import { CampaignService } from '../../services/campaigns.service';
import { Constants } from '../../services/constants';
import * as moment from 'moment';
import { LeadService } from '../../services/lead.service';


@Component({
  selector: 'app-formLead',
  templateUrl: './formLead.component.html',
  providers: [LeadService, CampaignService]
})
export class formLeadComponent implements OnInit {
	@Input() sectionParent;
  	@Input() lead;
  	@Input() listDropdown;
  	@Input() newItem;  	

  	@Output() closeEvent = new EventEmitter();
  	@Output() msgSnackBar = new EventEmitter();
  	@Output() reloadEvent = new EventEmitter();
  	@Output() editEvent: EventEmitter<any>  = new EventEmitter();
  	@Output() changeEditSectionChild: EventEmitter<any>  = new EventEmitter();

  	public campaigns: Array<Campaign>;//Listado de campañas
  	public campaign: Campaign; //NgModel
  	
  	public reviewed : boolean = false;
  	public dateInput;
  	public hourInput;
  	public createSelection;

  	public sugarId: string;
    public sugar_userId: string;

	constructor(		
		private leadService: LeadService,
		private campaignService: CampaignService
	) { }

	ngOnInit() {
        this.reviewed = (this.lead.reviewed==='1')? true : false;
        this.lead.customer_type = (this.newItem) ? {name: "new", value: "Nuevo"}: this.lead.customer_type;
		this.sugarId = localStorage.getItem('sugarId');
        this.sugar_userId = localStorage.getItem('sugar_userId');
        this.createSelection = this.sectionParent;
        this.dateField();
        this.getCampaigns();
	}

	/*definir el dia y la hora en el campo de creacion de lead*/
	dateField(): void{
		let datetoPrint = (this.lead.date_created) ? this.lead.date_created: new Date();		
		this.dateInput =  moment(datetoPrint).toISOString();
    	this.hourInput =   moment(datetoPrint).format('HH:mm');
	}

	/*servicio para crear lead*/
	saveLead(lead: Lead): void {
	    this.leadService
	      .createLead(lead,this.sugarId,this.sugar_userId)
	      .subscribe(response => {	        
	      	this.editEvent.emit(false);	        
	        this.reloadList();
	        this.sendMsgSnackBar('Lead Creado', 'statusColor--Cyan');
	      },
	      errorResponse => {
	        let body = JSON.parse(errorResponse._body);
	        console.log('error',body) ;
	      });
	 }

	/*servicio para actualizar lead*/
	updateLead(lead: Lead): void {
	    this.leadService

	      .updateLead(lead,this.sugarId,this.sugar_userId)
	      .subscribe(response => {	        
	      	this.editEvent.emit(false);	        
	        this.reloadList();
	       	this.sendMsgSnackBar('Lead Actualizado', 'statusColor--Green');
	      },
	      errorResponse => {
	        let body = JSON.parse(errorResponse._body);
	        console.log('error',body) ;
	      });
	 }

	

	/*servicio para obtener la lista de campañas*/
	getCampaigns(): void {
	    this.campaignService
	      .getCampaigns(this.sugarId,this.sugar_userId)
	      .subscribe(data => {	      	
	        this.campaigns = data.message;	        
	    });
	}	


	/*funcion para control del formulario*/
	formLead(): void {
		this.lead.reviewed = (this.reviewed)? '1' : '0';

		let formatDate = moment(this.dateInput).format('MM-DD-YYYY');
		let dateplusHour = moment(formatDate + ' ' + this.hourInput, 'MM/DD/YYYY HH:mm');
		this.lead.date_created = moment(dateplusHour).format('YYYY-MM-DD HH:mm:ss');

		if(this.createSelection!== 'Lead'){
			this.lead.converted = '1';
			this.changeEditSectionChild.emit('opportunity');
			
		}else{
			if(this.newItem){	
				this.saveLead(this.lead);
			}else{
				this.updateLead(this.lead);
			}
		}		
	}

	/*check selects*/
	compareSelects(item1,item2){
			
	    return item1 && item2 ? item1.value === item2.value : item1 === item2;
	}
	compareSelectsName(item1,item2){
	    return item1 && item2.name ? item1.name === item2.name : item1 === item2;
	}

	compareSelectsValue(item1,item2){
	    return item1.value && item2 ? item1.value === item2 : item1 === item2;
	}

	compareSelectsNormal(item1,item2){	
	    return item1 === item2;
	}
	
	closeOverlayEvent(){		
		this.closeEvent.emit();
	}
	reloadList(){		
		this.reloadEvent.emit();
	}

	sendMsgSnackBar(message, colors) {
    	this.msgSnackBar.emit({message,colors});
  	}

}
