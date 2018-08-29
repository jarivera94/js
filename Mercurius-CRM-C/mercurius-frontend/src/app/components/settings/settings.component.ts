import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  providers: []
})
export class SettingsComponent implements OnInit {
	

	public overlay : boolean = false;
	public alert : boolean = false;
	public edit: boolean = false;
    public sugarId: string;
    public sugar_userId: string;
	constructor(		
		public snackBar: MatSnackBar
	) { }

	ngOnInit() {
        this.sugarId = localStorage.getItem('sugarId');
        this.sugar_userId = localStorage.getItem('sugar_userId');
		
    	

	}


	

	
	

	/*Overlay control*/
	closeOverlay() {
		this.overlay = false;
	}

	openOverlay(project) {
		this.overlay = true;
		
	}


	closeAlert() {
		this.alert = false;
	}
	openAlert(project) {
		this.alert = true;		
	}

	openSnackBar(message) {
	    this.snackBar.open(message,'', { duration : 2000 });
	}

}
