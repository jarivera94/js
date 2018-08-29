import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Contact } from '../../models/contact';
import { Account } from '../../models/account';

import { Constants } from '../../services/constants';
import * as moment from 'moment';
import { ContactService } from '../../services/contact.service';
import { AccountService } from '../../services/account.service';



@Component({
  selector: 'app-formContact',
  templateUrl: './formContact.component.html',
  providers: [ContactService, AccountService]
})
export class formContactComponent implements OnInit {
	@Input() sectionParent;
  	@Input() contactInput;
  	@Input() listDropdown;
  	@Input() newItem;  	

  	@Output() closeEvent = new EventEmitter();
  	@Output() msgSnackBar = new EventEmitter();
  	@Output() reloadEvent = new EventEmitter();
  	@Output() editEvent: EventEmitter<any>  = new EventEmitter();
  	@Output() changeEditSectionChild: EventEmitter<any>  = new EventEmitter();

  	public contacts: Array<Contact>;//Listado de Cuentas
  	public contact: Contact; //NgModel  	 	

  	public accounts: Array<Account>;//Listado de Cuentas
  	public account: Account; //NgModel
  	
  	public mainContact : boolean = false;
  	public createSelection;

  	public sugarId: string;
    public sugar_userId: string;

	constructor(		
		private contactService: ContactService,
		private accountService: AccountService
	) { }

	ngOnInit() {
        
        
		this.sugarId = localStorage.getItem('sugarId');
        this.sugar_userId = localStorage.getItem('sugar_userId');
        this.createSelection = this.sectionParent;

        this.contact = this.contactInput;

        this.mainContact = (this.contact.isMainContact==='1')? true : false;

        this.getAccounts();
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

	

	/*servicio para crear un nuevo contacto*/
	saveContact(contact: Contact): void {
	    this.contactService
	      .createContact(contact,this.sugarId,this.sugar_userId)
	      .subscribe(response => {
	        //this.closeOverlay();
	        //this.getContacts();
	        //this.openSnackBar('Contacto Creado', 'statusColor--Cyan');

	        this.closeOverlayEvent()
	        //this.editEvent.emit(false);	        
	        this.reloadList();
	       	this.sendMsgSnackBar('Contacto Creado', 'statusColor--Cyan');
	      },
	      errorResponse => {
	        let body = JSON.parse(errorResponse._body);
	        console.log('error',body) ;
	      });
	 }

	/*servicio para actualizar contactos*/
	updateContact(contact: Contact): void {
	    this.contactService
	      .updateContact(contact,this.sugarId,this.sugar_userId)
	      .subscribe(response => {
	        //this.closeOverlay();
	        //this.getContacts();

	        //this.openSnackBar('Contacto Actualizado', 'statusColor--Green');

	        this.closeOverlayEvent()
	        //this.editEvent.emit(false);	        
	        this.reloadList();
	       	this.sendMsgSnackBar('Contacto Actualizado', 'statusColor--Green');
	      },
	      errorResponse => {
	        let body = JSON.parse(errorResponse._body);
	        console.log('error',body) ;
	      });
	 }


	/*funcion para control del formulario*/
	formContact(): void {
		this.contact.isMainContact = (this.mainContact)? '1' : '0';

		if(this.newItem){
			this.saveContact(this.contact);
		}else{
			this.updateContact(this.contact);
		}
	}

	/*check selects*/
	compareSelects(item1,item2){		
	    return item1 && item2 ? item1.id === item2.id : item1 === item2;
	}
	compareSelectsName(item1,item2){
	    return item1 && item2.name ? item1.name === item2.name : item1 === item2;
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
