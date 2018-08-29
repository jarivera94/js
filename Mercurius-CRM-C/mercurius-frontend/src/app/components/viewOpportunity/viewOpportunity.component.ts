import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-viewOpportunity',
  templateUrl: './viewOpportunity.component.html',
  providers: []
})
export class viewOpportunityComponent implements OnInit {
  	@Input() opportunity;
  	@Input() listDropdown;
 
  	@Output() reloadEvent = new EventEmitter();
  	@Output() closeEvent = new EventEmitter();
  	@Output() editEvent: EventEmitter<any>  = new EventEmitter();

	constructor(
	) { }

	ngOnInit() {
		
	}

	editOpportunity(): void{
		this.editEvent.emit(true);
	}
	
	closeOverlayEvent(){		
		this.closeEvent.emit();
	}
	reloadList(){		
		this.reloadEvent.emit();
	}

	

}
