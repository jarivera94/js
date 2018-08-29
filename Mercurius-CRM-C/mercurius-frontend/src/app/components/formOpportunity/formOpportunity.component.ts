import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Lead } from '../../models/lead';
import { Opportunity } from '../../models/opportunity';
import { Account } from '../../models/account';

import { Campaign } from '../../models/campaign';
import { CampaignService } from '../../services/campaigns.service';
import { Constants } from '../../services/constants';
import { OpportunityService } from '../../services/opportunity.service';
import { ConvertLeadService } from '../../services/convertlead.service';
import { AccountService } from '../../services/account.service';
import { deparmentListsService } from '../../services/departmentList.service';



@Component({
  selector: 'app-formOpportunity',
  templateUrl: './formOpportunity.component.html',
  providers: [OpportunityService, ConvertLeadService, AccountService, CampaignService, deparmentListsService]
})
export class formOpportunityComponent implements OnInit {
	@Input() sectionParent;
	@Input() opportunityInput;
  	@Input() lead;
  	@Input() listDropdown;
  	@Input() newItem;

  	@Output() closeEvent = new EventEmitter();
  	@Output() msgSnackBar = new EventEmitter();
  	@Output() reloadEvent = new EventEmitter();
  	@Output() editEvent: EventEmitter<any>  = new EventEmitter();
  	@Output() changeEditSectionChild: EventEmitter<any>  = new EventEmitter();
  	@Output() saveOpportunityforAccount = new EventEmitter();
  	

  	public router: Router;

  	public opportunity: Opportunity;//NgModel  

  	public accounts: Array<Account>;//Listado de Cuentas
  	public account: Account; //NgModel

  	public campaigns: Array<Campaign>;//Listado de campañas
  	public campaign: Campaign; //NgModel 	

  	public departmentsList;
  	public selectedDepartments:any;

  	public sugarId: string;
    public sugar_userId: string;

    public legalPerson : boolean = false;

	constructor(		
		private opportunityService: OpportunityService,
		private convertLeadService: ConvertLeadService,
		private campaignService: CampaignService,
		private accountService: AccountService,
		private departmentService: deparmentListsService,
		private _router: Router
	) {}

	ngOnInit() {
		this.router = this._router;
		this.sugarId = localStorage.getItem('sugarId');
        this.sugar_userId = localStorage.getItem('sugar_userId');
        this.getDepartments('');
        this.getCampaigns();
        this.getAccounts();
		this.checkLeadOpportunity();

	}

	/*convertir lead a oportunidad*/
	checkLeadOpportunity(){
		this.opportunity = new Opportunity(null, null, null, null, null, null, null, null, null, null, null, null, null);
		this.opportunity.account = new Account(null, null, null, null, null, null, null, null,null, null, null);

		if(this.lead){			
			this.opportunity.salutation = this.lead.salutation;
			this.opportunity.name = this.lead.firstname;
			this.opportunity.lastName = this.lead.lastname;
			this.opportunity.description = this.lead.description;
			this.opportunity.email = this.lead.email1;
			this.opportunity.campaign = this.lead.campaign;
			this.opportunity.account.name = this.opportunity.name;
			this.opportunity.account.lastName = this.opportunity.lastName;

			this.selectedDepartments = [];
			this.opportunity.apartments = '';
		}else{
			this.opportunity = this.opportunityInput;
		}

		this.legalPerson = (this.opportunity.isnaturalperson ==='0')? true : false;
		this.selectedDepartments = (typeof this.opportunity.apartments === 'string') ? this.opportunity.apartments.split(",") : this.opportunity.apartments;
	}


	/*servicio para obtener la lista de campañas*/
	getDepartments(campaignId): void {
	    this.departmentService
	      .getListsDepartments(this.sugarId,campaignId)
	      .subscribe(data => {	      	
	        this.departmentsList = data.message;	        
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

	/*servicio para obtener la lista de cuentas*/
	getAccounts(): void {
	    this.accountService
	      .getAccounts(this.sugarId,this.sugar_userId)
	      .subscribe(data => {
	      	//console.log(data);
	        this.accounts = data.message;
	        //console.log(this.campaigns );
	    });
	}

	/*servicio para crear Oportunidad*/
	saveOpportunity(opportunity: Opportunity): void {
	    this.opportunityService
	      .createOpportunity(opportunity,this.sugarId,this.sugar_userId)
	      .subscribe(response => {

	      	//this.editEvent.emit(false);
	        this.closeOverlayEvent();
	        this.reloadList();
	        this.sendMsgSnackBar('Oportunidad Creada', 'statusColor--Cyan');

	        
	      },
	      errorResponse => {
	        let body = JSON.parse(errorResponse._body);
	        console.log('error',body) ;
	      });
	 }

	/*servicio para actualizar Oportunidades*/
	updateOpportunity(opportunity: Opportunity): void {
	    this.opportunityService

	      .updateOpportunity(opportunity,this.sugarId,this.sugar_userId)
	      .subscribe(response => {

	        this.editEvent.emit(false);
	        //this.closeOverlayEvent();
	        this.reloadList();
	        this.sendMsgSnackBar('Oportunidad Actualizada', 'statusColor--Green');
	      },
	      errorResponse => {
	        let body = JSON.parse(errorResponse._body);
	        console.log('error',body) ;
	      });
	 }

	/*servicio para actualizar Oportunidades*/
	convertLead(lead: Lead, opportunity: Opportunity): void {
	    this.convertLeadService

	      .convertLead(lead,opportunity,this.sugarId,this.sugar_userId)
	      .subscribe(response => {
	        //this.editEvent.emit(false);
        	
	        this.sendMsgSnackBar('Lead Convertido', 'statusColor--Yellow');
	        this.reloadList();
	        this.closeOverlayEvent();
	        this.router.navigate(['/opportunities']);	        
	      },
	      errorResponse => {
	        let body = JSON.parse(errorResponse._body);
	        console.log('error',body) ;
	      });
	}


	 /*funcion para control del formulario*/
	formOpportunity(): void {
		this.opportunity.isnaturalperson = (this.legalPerson)? '0' : '1';

		let deparmentString = Array.isArray(this.selectedDepartments) ? this.selectedDepartments.toString(): '' ; 

		this.opportunity.apartments = (typeof this.selectedDepartments !== 'string') ? deparmentString : this.opportunity.apartments;
		
		if(this.lead && !this.legalPerson){
			this.opportunity.account.name = this.opportunity.name;
			this.opportunity.account.lastName = this.opportunity.lastName;

			this.convertLead(this.lead, this.opportunity);

		}else if(this.legalPerson && this.newItem && !this.opportunity.account.id){
			
			this.opportunity.account = new Account(null, null, null, null, null, null, null, null,null, null, null);
			this.sendOpportunityforAccount(this.opportunity);
			this.changeEditSectionChild.emit('account');

		}else{
			if(this.newItem){
				this.opportunity.account.name = this.opportunity.name;
				this.opportunity.account.lastName = this.opportunity.lastName;

				this.saveOpportunity(this.opportunity);
			}else{
				this.updateOpportunity(this.opportunity);
			}
		}		
	}


	refreshDepartmentList(event){
		this.getDepartments(event.id);
	}


	reNameAccount(event) {	    
	    this.opportunity.account = event;
	    this.legalPerson = (event.typeDocument==='NIT') ? true: false;
	}

	/*funcion para cambiar probabilidad*/
	changeProbability(event): void {
		let eventValue = event.value;
		//console.log(eventValue);
		
		switch (eventValue) {
		    case 'Prospecting':
		        this.opportunity.probability = '10';
		        break; 
		    case 'Qualification':
		        this.opportunity.probability = "20";
		        break; 
		    case 'Needs Analysis':
		        this.opportunity.probability = "25";
		        break;
		    case 'Value Proposition':
		        this.opportunity.probability = "30";
		        break;
		    case 'Id. Decision Makers':
		        this.opportunity.probability = "40";
		        break;
		    case 'Perception Analysis':
		        this.opportunity.probability = "50";
		        break;
		    case 'Proposal/Price Quote':
		        this.opportunity.probability = "65";
		        break;
		    case 'Negotiation/Review':
		        this.opportunity.probability = "80";
		        break;
		    case 'Closed Won':
		        this.opportunity.probability = "100";
		        break;
		    case 'Closed Lost':
		        this.opportunity.probability = "0";
		        break;
		    case 'No comprado':
		    case 'not_bought':
		        this.opportunity.probability = "0";
		        break;
		    case 'Separado':
		    case 'separated':
		        this.opportunity.probability = "50";
		        break;
		    case 'Concretado':
		    case 'concreted':
		        this.opportunity.probability = "100";
		        break;
		}
	}

	/*check selects*/
	compareSelects(item1,item2){
		//console.log(item1,item2);
	    return item1 && item2 ? item1.id === item2.id : item1 === item2;
	}
	compareSelectsNormal(item1,item2){
		//console.log(item1,item2);
	    return item1 === item2;
	}

	compareSelectsName(item1,item2){
		//console.log(item1,item2);
	    return item1 && item2 ? item1.name === item2 : item1 === item2;
	}
	
	

	/*function for parent components*/

	sendOpportunityforAccount(opportunity){
		this.saveOpportunityforAccount.emit(opportunity);
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
