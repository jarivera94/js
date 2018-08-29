import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  providers: [ProjectService]
})
export class ProjectComponent implements OnInit {
	public projects: Array<Project>;//Listado de proyectos
  	public project: Project; //NgModel

	public overlay : boolean = false;
	public alert : boolean = false;
	public edit: boolean = false;
    public sugarId: string;
    public sugar_userId: string;

    public PAG_ITEMS_NUMBER: number = 5;
  	public page: number = 1;
  	
	constructor(
		private projectService: ProjectService,
		public snackBar: MatSnackBar
	) { }

	ngOnInit() {
        this.sugarId = localStorage.getItem('sugarId');
        this.sugar_userId = localStorage.getItem('sugar_userId');
		this.getProjects();
    	this.project = new Project(null, null);

	}


	/*servicio para obtener la lista de projectos*/
	getProjects(): void {
	    this.projectService
	      .getProject(this.sugarId,this.sugar_userId)
	      .subscribe(data => {
	        this.projects = data.message;
	    });
	}

	/*servicio para crear nuevo proyecto*/
	saveProject(project: Project): void {
	    this.projectService
	      .createProject(project,this.sugarId,this.sugar_userId)
	      .subscribe(response => {
	        this.closeOverlay();
	        this.getProjects();
	        this.openSnackBar('Proyecto Creado', 'statusColor--Cyan');
	      },
	      errorResponse => {
	        let body = JSON.parse(errorResponse._body);
	        console.log('error',body) ;
	      });
	 }

	/*servicio para actualizar proyecto*/
	updateProject(project: Project): void {
	    this.projectService
	      .updateProject(project,this.sugarId,this.sugar_userId)
	      .subscribe(response => {
	        this.closeOverlay();
	        this.getProjects();
	        this.openSnackBar('Proyecto Actualizado', 'statusColor--Green');
	      },
	      errorResponse => {
	        let body = JSON.parse(errorResponse._body);
	        console.log('error',body) ;
	      });
	 }

	/*servicio para actualizar proyecto*/
	deleteProject(project: Project): void {
	    this.projectService
	      .deleteProject(project,this.sugarId,this.sugar_userId)
	      .subscribe(response => {
	        this.getProjects();
	        this.openSnackBar('Proyecto Borrado', 'statusColor--Red');
	      },
	      errorResponse => {
	        let body = JSON.parse(errorResponse._body);
	        console.log('error',body) ;
	      });
	 }

	/*funcion para control del formulario*/
	formProject(): void {
		if(!this.edit){
			this.saveProject(this.project);
		}else{
			this.updateProject(this.project);
		}
	}

	formProjectDelete(): void{
		this.deleteProject(this.project);
		this.closeAlert();
	}

	/*Overlay control*/
	closeOverlay() {
		this.overlay = false;
	}

	openOverlay(project) {
		this.overlay = true;
		this.project = (!this.edit) ? new Project(null, null) : project;
	}


	closeAlert() {
		this.alert = false;
	}
	openAlert(project) {
		this.alert = true;
		this.project = project;
	}

	openSnackBar(message, className) {
	    this.snackBar.open(message,'', { duration : 2000, panelClass: [className], verticalPosition: 'bottom', horizontalPosition: 'left' });
	}
	
}
