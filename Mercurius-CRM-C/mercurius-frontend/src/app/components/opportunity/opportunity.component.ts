import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Opportunity } from '../../models/opportunity';
import { Account } from '../../models/account';

import { Constants } from '../../services/constants';
import { OpportunityService } from '../../services/opportunity.service';


import { enumListsService } from '../../services/enumList.service';


@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  providers: [OpportunityService, enumListsService]
})
export class OpportunityComponent implements OnInit {  	
	public opportunities: Array<Opportunity>;//Listado de Oportunidades
  	public opportunity: Opportunity; //NgModel
  	public account: Account; //NgModel  	
    public listDropdown;

	public overlay : boolean = false;
    public tabSelection: string;
	public edit: boolean = false;
	public alert: boolean = false;
	public newItem: boolean = false;
	
    public sugarId: string;
    public sugar_userId: string;
    
    public legalPerson : boolean = false;

    public PAG_ITEMS_NUMBER: number = 5;
  	public page: number = 1;

  	public cards: boolean= true;

  	public stagesOpportunities:any[];

  	public section:string;
  	public editSection: string;

	constructor(
		private listService: enumListsService,
		private opportunityService: OpportunityService,		
		public snackBar: MatSnackBar
		
	) { }

	ngOnInit() {
        this.sugarId = localStorage.getItem('sugarId');
        this.sugar_userId = localStorage.getItem('sugar_userId');
		
		this.getOpportunities();
		this.getEnumList();   	
	}


	/*servicio para obtener la lista de oportunidades*/
	getOpportunities(): void {
	    this.opportunityService
	      .getOpportunities(this.sugarId,this.sugar_userId)
	      .subscribe(data => {	      	
	        this.opportunities = data.message;

	        this.stagesOpportunities = this.listDropdown.StateSale;	
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

	

	/*servicio para borrar oportunidad*/
	deleteOpportunity(opportunity: Opportunity): void {
	    this.opportunityService
	      .deleteOpportunity(opportunity,this.sugarId,this.sugar_userId)
	      .subscribe(response => {
	        this.getOpportunities();
	        this.openSnackBar('Oportunidad Borrada', 'statusColor--Red');
	      },
	      errorResponse => {
	        let body = JSON.parse(errorResponse._body);
	        console.log('error',body) ;
	      });
	 }
	

	formOpportunityDelete(): void{
		this.deleteOpportunity(this.opportunity);
		this.closeAlert();
	}
	

	/*check selects*/
	compareSelects(item1,item2){
		//console.log(item1,item2);
	    return item1 && item2 ? item1.id === item2.id : item1 === item2;    
	}
	compareSelectsName(item1,item2){		
	    return item1 && item2.name ? item1 === item2.name : item1 === item2;
	}

	/*Overlay control*/
	closeOverlay() {
		this.overlay = false;
	}

	openOverlay(opportunity) {
		this.tabSelection = 'info';

		let newOpportunity = new Opportunity(null, null, null, null, null, null, null, null, null, null, null, null, null);
		newOpportunity.account = new Account(null, null, null, null, null, null, null, null,null, null, null); 
		
		this.overlay = true;
		this.opportunity =  (this.newItem) ? newOpportunity : opportunity;

		this.section = 'Opportunity'
		this.editSection = 'opportunity';
		
	}
	

	changeTabs(tabSel) : void{
		this.tabSelection = tabSel;		
	}	

	closeAlert() {
		this.alert = false;
	}
	openAlert(opportunity) {
		this.alert = true;
		this.opportunity = opportunity;
	}
	

	openSnackBar(message, className) {
	    this.snackBar.open(message,'', { duration : 2000, panelClass: [className], verticalPosition: 'bottom', horizontalPosition: 'left' });
	}


	/*function for external components*/

	openEdit(event): void {				
	    this.edit = event;
	}
	
	changeEditSection(event): void {					
	    this.editSection = event;
	    this.newItem = true;
	}

	getMsgSnackBar(objMsg): void {
	    this.openSnackBar(objMsg.message, objMsg.colors);
	}

}
