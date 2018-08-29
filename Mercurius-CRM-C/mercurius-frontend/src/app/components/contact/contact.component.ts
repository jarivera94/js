import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Contact } from '../../models/contact';

import { Constants } from '../../services/constants';
import { ContactService } from '../../services/contact.service';
import { enumListsService } from '../../services/enumList.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  providers: [enumListsService, ContactService]
})
export class ContactComponent implements OnInit {
	public contacts: Array<Contact>;//Listado de Cuentas
  	public contact: Contact; //NgModel

	public overlay : boolean = false;

	public edit: boolean = false;
	public alert: boolean = false;
	public newItem: boolean = false;
    public sugarId: string;
    public sugar_userId: string;
    public saludationList = Constants.SALUDATION_LIST;

    public listDropdown;    

    public PAG_ITEMS_NUMBER: number = 5;
  	public page: number = 1;

  	public tabSelection: string;

  	public section:string;
  	public editSection: string;

	constructor(
		private listService: enumListsService,
		private contactService: ContactService,		
		public snackBar: MatSnackBar
	) { }

	ngOnInit() {
        this.sugarId = localStorage.getItem('sugarId');
        this.sugar_userId = localStorage.getItem('sugar_userId');
        this.getEnumList();
        this.getContacts();
		
				
    	this.contact = new Contact(null, null, null, null, null, null, null, null, null);
	}


	/*servicio para obtener la lista de contactos*/
	getContacts(): void {
	    this.contactService
	      .getContacts(this.sugarId,this.sugar_userId)
	      .subscribe(data => {
	      	//console.log(data);
	        this.contacts = data.message;
	        //console.log(this.contacts );
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

	

	/*servicio para borrar Contactos*/
	deleteContact(contact: Contact): void {
	    this.contactService
	      .deleteContact(contact,this.sugarId,this.sugar_userId)
	      .subscribe(response => {
	        this.getContacts();
	        this.openSnackBar('Contacto Borrado', 'statusColor--Red');
	   	    },
	      errorResponse => {
	        let body = JSON.parse(errorResponse._body);
	        console.log('error',body) ;
	      });
	 }

	

	formContactDelete(): void{
		this.deleteContact(this.contact);
		this.closeAlert();
	}

	/*check selects*/
	compareSelects(item1,item2){		
	    return item1 && item2 ? item1.id === item2.id : item1 === item2;    
	}
	compareSelectsName(item1,item2){
	    return item1 && item2.name ? item1 === item2.name : item1 === item2;
	}


	/*Overlay control*/
	closeOverlay() {
		this.overlay = false;
	}

	openOverlay(contact) {
		this.tabSelection = 'info';

		let newContact = new Contact(null, null, null, null, null, null, null, null, null);	
		this.overlay = true;
		this.contact =  (this.newItem) ? newContact : contact;
		
		this.section = 'Contact'
		this.editSection = 'contact';
		
		//console.log(this.contact );
	}

	closeAlert() {
		this.alert = false;
	}
	openAlert(contact) {
		this.alert = true;
		this.contact = contact;
	}

	openSnackBar(message, className) {
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

}
