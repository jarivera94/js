import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-viewAccount',
  templateUrl: './viewAccount.component.html',
  providers: []
})
export class viewAccountComponent implements OnInit {
  	@Input() account;
 
  	@Output() reloadEvent = new EventEmitter();
  	@Output() closeEvent = new EventEmitter();

  	@Output() editEvent: EventEmitter<any>  = new EventEmitter();

	constructor(
	) { }

	ngOnInit() {
		
	}

	editAccount(): void{
		this.editEvent.emit(true);
	}
	
	closeOverlayEvent(){		
		this.closeEvent.emit();
	}
	reloadList(){		
		this.reloadEvent.emit();
	}

	

}
