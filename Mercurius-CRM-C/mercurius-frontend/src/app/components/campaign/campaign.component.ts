import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Campaign } from '../../models/campaign';
import { Project } from '../../models/project';
import { CampaignService } from '../../services/campaigns.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  providers: [CampaignService, ProjectService]
})
export class CampaignComponent implements OnInit {
	public campaigns: Array<Campaign>;//Listado de campañas
  	public campaign: Campaign; //NgModel

  	public projects: Array<Project>;//Listado de proyectos
  	public project: Project; //NgModel

  	public campaignOptions;
	public overlay : boolean = false;
	public edit: boolean = false;
	public alert: boolean = false;
    public sugarId: string;
    public sugar_userId: string;

    public validDates: boolean = true;

    public PAG_ITEMS_NUMBER: number = 4;
  	public page: number = 1;

	constructor(
		private campaignService: CampaignService,
		private projectService: ProjectService,
		public snackBar: MatSnackBar
	) { }

	ngOnInit() {
        this.sugarId = localStorage.getItem('sugarId');
        this.sugar_userId = localStorage.getItem('sugar_userId');
		this.getProjects();
		this.getCampaigns();
		this.getCampaignsOptions();
		this.campaign = new Campaign(null, null, null, null, null, null, null, null, null);
    	
	}


	/*servicio para obtener la lista de campañas*/
	getCampaigns(): void {
	    this.campaignService
	      .getCampaigns(this.sugarId,this.sugar_userId)
	      .subscribe(data => {
	      	//console.log(data);
	        this.campaigns = data.message;
	        //console.log(this.campaigns );
	    });
	}

	/*servicio para obtener los tipos de campañas y los  estados de campaña */
	getCampaignsOptions(): void {
	    this.campaignService
	      .getCampaignsOptions()
	      .subscribe(data => {
	      	//console.log(data);
	        this.campaignOptions = data.message;
	        //console.log(this.campaignOptions );
	    });
	}

	/*servicio para obtener la lista de projectos*/
	getProjects(): void {
	    this.projectService
	      .getProject(this.sugarId,this.sugar_userId)
	      .subscribe(data => {
	        this.projects = data.message;
	    });
	}

	/*servicio para crear una nueva campaña*/
	saveCampaign(campaign: Campaign): void {
	    this.campaignService
	      .createCampaign(campaign,this.sugarId,this.sugar_userId)
	      .subscribe(response => {
	        this.closeOverlay();
	        this.getCampaigns();
	        this.openSnackBar('Campaña creada', 'statusColor--Cyan');
	      },
	      errorResponse => {
	        let body = JSON.parse(errorResponse._body);
	        console.log('error',body) ;
	      });
	 }

	/*servicio para actualizar campaña*/
	updateCampaign(campaign: Campaign): void {
	    this.campaignService
	      .updateCampaign(campaign,this.sugarId,this.sugar_userId)
	      .subscribe(response => {
	        this.closeOverlay();
	        this.getCampaigns();
	        this.openSnackBar('Campaña actualizada', 'statusColor--Green');
	      },
	      errorResponse => {
	        let body = JSON.parse(errorResponse._body);
	        console.log('error',body) ;
	      });
	 }

	/*servicio para borrar camapaña*/
	deleteCampaign(campaign: Campaign): void {
	    this.campaignService
	      .deleteCampaign(this.sugarId,campaign)
	      .subscribe(response => {
	        this.getCampaigns();
	        this.openSnackBar('Campaña borrada', 'statusColor--Red');
	      },
	      errorResponse => {
	        let body = JSON.parse(errorResponse._body);
	        console.log('error',body) ;
	      });
	 }

	/*funcion para control del formulario*/
	formCampaign(): void {
		if(!this.edit){
			this.saveCampaign(this.campaign);
		}else{
			this.updateCampaign(this.campaign);
		}
	}

	formCampaignDelete(): void{
		this.deleteCampaign(this.campaign);
		this.closeAlert();
	}

	/*check selects*/
	compareSelects(item1,item2){
		//console.log(item1, item2.id);
	    return item1 && item2.id ? item1.id === item2.id : item1 === item2;
	}
	compareSelectsName(item1,item2){
	    return item1 && item2.name ? item1 === item2.name : item1 === item2;
	}

	/*comparate dates*/
	comparateDates(e){
		if(this.campaign.startDate && this.campaign.endDate){
			let endDayValid: boolean = false;
	 		endDayValid =  (this.campaign.startDate < this.campaign.endDate) ? false: true ;			
			this.validDates = endDayValid;
		}			
	}

	/*Overlay control*/
	closeOverlay() {
		this.overlay = false;
	}

	openOverlay(campaign) {
		let newCampaing = new Campaign(null, null, null, null, null, null, null, null, null);

		this.overlay = true;
		this.campaign =  (!this.edit) ? newCampaing : campaign;

	}

	closeAlert() {
		this.alert = false;
	}
	openAlert(campaign) {
		this.alert = true;
		this.campaign = campaign;
	}

	openSnackBar(message, className) {
	    this.snackBar.open(message,'', { duration : 2000, panelClass: [className], verticalPosition: 'bottom', horizontalPosition: 'left' });
	}

}
