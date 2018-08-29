import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatCheckboxModule  } from '@angular/material';
import { Lead } from '../../models/lead';
import { Opportunity } from '../../models/opportunity';

import { Constants } from '../../services/constants';
import { LeadService } from '../../services/lead.service';
import { enumListsService } from '../../services/enumList.service';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  providers: [LeadService, enumListsService]
})
export class LeadComponent implements OnInit {
	public leads: Array<Lead>;//Listado de Leads
  	public lead: Lead; //NgModel

  	public opportunity: Opportunity;//NgModel    	

  	public listDropdown;
	public overlay : boolean = false;
	public edit: boolean;
	public newItem: boolean = false;
	public alert: boolean = false;
    public sugarId: string;
    public sugar_userId: string;

    public reviewed : boolean = false;

    public PAG_ITEMS_NUMBER: number = 5;
  	public page: number = 1;

  	public tabSelection: string;

  	public section:string;
  	public editSection: string;


	constructor(
		private listService: enumListsService,
		private leadService: LeadService,
		public snackBar: MatSnackBar
	) { }

	ngOnInit() {
        this.sugarId = localStorage.getItem('sugarId');
        this.sugar_userId = localStorage.getItem('sugar_userId');
		this.getLead();
		this.getEnumList();
		
    	this.lead = new Lead(null, null, null, null, null, null, null, null, null, null, null, null, null);
	}


	/*servicio para obtener la lista de Leads*/
	getLead(): void {        
	    this.leadService
	      .getLeads(this.sugarId,this.sugar_userId)
	      .subscribe(data => {
	        this.leads = data.message;
	        //console.log('leads',this.leads );
	    });
	}
	
	/*servicio para obtener las lista de los selects*/
	getEnumList(): void {
	    this.listService
	      .getLists(this.sugarId,'')
	      .subscribe(data => {
	        this.listDropdown = data.message;
	    });
	}		


	/*servicio para borrar lead*/
	deleteLead(lead: Lead): void {
	    this.leadService
	      .deleteLead(lead,this.sugarId)
	      .subscribe(response => {
	        this.getLead();
	        this.openSnackBar('Lead Borrado', 'statusColor--Red');
	      },
	      errorResponse => {
	        let body = JSON.parse(errorResponse._body);
	        console.log('error',body) ;
	      });
	 }



	formLeadDelete(): void{
		this.deleteLead(this.lead);
		this.closeAlert();
	}	
	

	/*Overlay control*/
	closeOverlay() : void{
		this.overlay = false;
		this.getLead();
	}
	openOverlay(lead) : void {
		this.tabSelection = 'info';
		let initLead = new Lead(null, null, null, null, null, null, null, null, null, null, null, null, null);
		this.overlay = true;		
		this.lead =  (!lead) ? initLead : lead;

		this.section = 'Lead'
		this.editSection = 'lead';			
	}

	changeTabs(tabSel) : void{
		this.tabSelection = tabSel;		
	}	

	closeAlert() : void {
		this.alert = false;
	}
	openAlert(lead) : void{
		this.alert = true;
		this.lead = lead;
	}
	
	/*messages function*/
	openSnackBar(message, className): void {
	    this.snackBar.open(message,'', { duration : 2000, panelClass: [className], verticalPosition: 'bottom', horizontalPosition: 'left' });
	}


	/*function for external components*/

	getMsgSnackBar(objMsg): void {
	    this.openSnackBar(objMsg.message, objMsg.colors);
	}	  

	openEdit(event): void {			
	    this.edit = event;
	}

	changeEditSection(event): void {					
	    this.editSection = event;
	    this.newItem = true;
	}

	keepOpportunityforAccount(event): void{
		this.opportunity = event;
	}

}
