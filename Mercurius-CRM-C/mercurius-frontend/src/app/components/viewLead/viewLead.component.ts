import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-viewLead',
  templateUrl: './viewLead.component.html',
  providers: []
})
export class viewLeadComponent implements OnInit {
  	@Input() lead;
 
  	@Output() reloadEvent = new EventEmitter();
  	@Output() closeEvent = new EventEmitter();
  	@Output() editEvent: EventEmitter<any>  = new EventEmitter();


	constructor(		
		
	) { }

	ngOnInit() {       
	}

	editLead(): void{
		this.editEvent.emit(true);
	}
	
	closeOverlayEvent(){		
		this.closeEvent.emit();
	}
	reloadList(){		
		this.reloadEvent.emit();
	}

	

}
