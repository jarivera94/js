import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Campaign } from '../../models/campaign';
import { Account } from '../../models/account';

import { Constants } from '../../services/constants';

import { OpportunityService } from '../../services/opportunity.service';
import { CampaignService } from '../../services/campaigns.service';
import { AccountService } from '../../services/account.service';
import { ConvertLeadService } from '../../services/convertlead.service';



@Component({
  selector: 'app-formAccount',
  templateUrl: './formAccount.component.html',
  providers: [OpportunityService, AccountService,CampaignService, ConvertLeadService]
})
export class formAccountComponent implements OnInit {
	@Input() sectionParent;
	@Input() accountInput;
	@Input() opportunityInput;
	@Input() leadInput;

  	@Input() listDropdown;
  	@Input() newItem;

  	@Output() closeEvent = new EventEmitter();
  	@Output() msgSnackBar = new EventEmitter();
  	@Output() reloadEvent = new EventEmitter();
  	@Output() editEvent: EventEmitter<any>  = new EventEmitter();

  	public router: Router;  	 	

  	public accounts: Array<Account>;//Listado de Cuentas
  	public account: Account; //NgModel

  	public campaigns: Array<Campaign>;//Listado de campañas
  	public campaign: Campaign; //NgModel  	

  	public sugarId: string;
    public sugar_userId: string;    

	constructor(		
		private opportunityService: OpportunityService,		
		private accountService: AccountService,
		private campaignService: CampaignService,
		private convertLeadService: ConvertLeadService,
		private _router: Router
	) {}

	ngOnInit() {
       	
		
		this.router = this._router;
		this.sugarId = localStorage.getItem('sugarId');
        this.sugar_userId = localStorage.getItem('sugar_userId');
        this.getCampaigns();        
		this.checkOpportunityAccount();		
	}

	/*reviza si viene desde una opportunidad*/
	checkOpportunityAccount(){		
		
		if(!this.opportunityInput){			
			this.account = this.accountInput;			
		}else{
			this.account = this.opportunityInput.account;
			this.account.name = '';
			this.account.lastName = this.opportunityInput.lastName;
			this.account.description = this.opportunityInput.description;
			this.account.Campaign = this.opportunityInput.campaign;
			this.account.email = this.opportunityInput.email;			
			this.account.typeDocument = 'NIT';
			this.account.phone = (!this.leadInput)? '' : this.leadInput.phone_home;
		}		
	}



	/*servicio para obtener la lista de campañas*/
	getCampaigns(): void {
	    this.campaignService
	      .getCampaigns(this.sugarId,this.sugar_userId)
	      .subscribe(data => {	      	
	        this.campaigns = data.message;	        
	    });
	}		

	/*servicio para crear una nueva Cuenta*/
	saveAccount(account: Account): void {
	    this.accountService
	      .createAccount(account,this.sugarId,this.sugar_userId)
	      .subscribe(response => {
	        /*this.closeOverlay();
	        this.getAccounts();

	        this.openSnackBar('Cuenta Creada', 'statusColor--Green');*/
	        
	        if(this.sectionParent == 'Opportunity'){	        	
		        //this.closeOverlayEvent();	        
		        this.reloadList();
		        this.sendMsgSnackBar('Cuenta Creada', 'statusColor--Cyan');
		        this.router.navigate(['/accounts']);
	        }else{
	        	this.editEvent.emit(false);
		        //this.closeOverlayEvent();	        
		        this.reloadList();
		        this.sendMsgSnackBar('Cuenta Creada', 'statusColor--Cyan');
	        }

	      },
	      errorResponse => {
	        let body = JSON.parse(errorResponse._body);
	        console.log('error',body) ;
	      });
	 }

	/*servicio para actualizar Cuentas*/
	updateAccount(account: Account): void {
	    this.accountService
	      .updateAccount(account,this.sugarId,this.sugar_userId)
	      .subscribe(response => {

	      	this.editEvent.emit(false);
	      	//this.closeOverlayEvent();	        
	        this.reloadList();
	       	this.sendMsgSnackBar('Cuenta Actualizada', 'statusColor--Green');
	        /*this.closeOverlay();
	        this.getAccounts();

	        this.openSnackBar('Cuenta Actualizada', 'statusColor--Cyan');*/
	      },
	      errorResponse => {
	        let body = JSON.parse(errorResponse._body);
	        console.log('error',body) ;
	      });
	 }

	 /*servicio para actualizar Oportunidades*/
	convertLead(lead, opportunity): void {
	    this.convertLeadService

	      .convertLead(lead,opportunity,this.sugarId,this.sugar_userId)
	      .subscribe(response => {
	        //this.editEvent.emit(false);
        	
	        this.sendMsgSnackBar('Lead Convertido', 'statusColor--Yellow');
	        this.sendMsgSnackBar('Cuenta Creada', 'statusColor--Cyan');
	        this.reloadList();
	        this.closeOverlayEvent();
	        this.router.navigate(['/accounts']);	        
	      },
	      errorResponse => {
	        let body = JSON.parse(errorResponse._body);
	        console.log('error',body) ;
	      });
	}
	

	/*funcion para control del formulario*/
	formAccount(): void {

		console.log(this.sectionParent);

		if(this.newItem && this.sectionParent == 'Lead'){
	    	this.opportunityInput.account =  this.account;
	    	this.convertLead(this.leadInput,this.opportunityInput );
		}else if(this.newItem && this.sectionParent == 'Opportunity'){
			this.saveAccount(this.account);
		}else if(this.newItem){
			this.saveAccount(this.account);
		}else{
			this.updateAccount(this.account);
		}
		
	}

	/*check selects*/
	compareSelects(item1,item2){
		//console.log(item1,item2);
	    return item1 && item2 ? item1.id === item2.id : item1 === item2;
	}
	compareSelectsName(item1,item2){
	    return item1.name && item2 ? item1.name === item2 : item1 === item2;
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
