import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Account } from '../../models/account';
import { AccountService } from '../../services/account.service';
import { enumListsService } from '../../services/enumList.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  providers: [AccountService, enumListsService]
})
export class AccountComponent implements OnInit {
  	public accounts: Array<Account>;//Listado de Cuentas
  	public account: Account; //NgModel	

  	public listDropdown;
	public overlay : boolean = false;
	public edit: boolean = false;
	public newItem: boolean = false;
	public alert: boolean = false;
    public sugarId: string;
    public sugar_userId: string;

    public PAG_ITEMS_NUMBER: number = 5;
  	public page: number = 1;

  	public tabSelection: string;

  	public section:string;
  	public editSection: string;

	constructor(
		private listService: enumListsService,		
		private accountService: AccountService,
		public snackBar: MatSnackBar
	) { }

	ngOnInit() {
        this.sugarId = localStorage.getItem('sugarId');
        this.sugar_userId = localStorage.getItem('sugar_userId');
		
		this.getAccounts();
		this.getEnumList();
				
    	this.account = new Account(null, null, null, null, null, null, null, null,null, null, null);
	}

	/*servicio para obtener la lista de cuentas*/
	getAccounts(): void {
	    this.accountService
	      .getAccounts(this.sugarId,this.sugar_userId)
	      .subscribe(data => {
	      	//console.log(data);
	        this.accounts = data.message;
	        //console.log(this.accounts );
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
		

	/*servicio para borrar Cuentas*/
	deleteAccount(account: Account): void {
	    this.accountService
	      .deleteAccount(account,this.sugarId,this.sugar_userId)
	      .subscribe(response => {
	        this.getAccounts();

	        this.openSnackBar('Cuenta Borrada', 'statusColor--Red');
	      },
	      errorResponse => {
	        let body = JSON.parse(errorResponse._body);
	        console.log('error',body) ;
	      });
	 }

	

	formAccountDelete(): void{
		this.deleteAccount(this.account);
		this.closeAlert();
	}

	/*Overlay control*/
	closeOverlay() {
		this.overlay = false;
	}

	openEdit(event): void {			
	    this.edit = event;
	}

	openOverlay(account) {
		this.tabSelection = 'info';
		let newAccount = new Account(null, null, null, null, null, null, null, null,null, null, null);	
		this.overlay = true;
		this.account =  (this.newItem) ? newAccount : account;

		this.section = 'Account'
		this.editSection = 'account';
		
	}

	changeTabs(tabSel) : void{
		this.tabSelection = tabSel;		
	}

	closeAlert() {
		this.alert = false;
	}
	openAlert(account) {
		this.alert = true;
		this.account = account;
	}

	getMsgSnackBar(objMsg): void {
	    this.openSnackBar(objMsg.message, objMsg.colors);
	}

	openSnackBar(message, className) {
	    this.snackBar.open(message,'', { duration : 2000, panelClass: [className], verticalPosition: 'bottom', horizontalPosition: 'left' });
	}

}
