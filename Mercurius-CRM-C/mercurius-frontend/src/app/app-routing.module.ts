import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, 
		 DashboardComponent, 
		 ProjectComponent, 
		 CampaignComponent, 
		 LeadComponent, 
		 AccountComponent, 
		 ContactComponent, 
		 OpportunityComponent,
		 SettingsComponent 
		} from './components/index';


const appRoutes: Routes = [
	{ path: '', redirectTo: '/projects', pathMatch: 'full' },
	{ path: 'dashboard', component: DashboardComponent  },
	{ path: 'projects', component: ProjectComponent  },
	{ path: 'campaigns', component: CampaignComponent  },
	
	{ path: 'accounts', component: AccountComponent  },
	{ path: 'contacts', component: ContactComponent  },
	{ path: 'opportunities', component: OpportunityComponent  },
	{ path: 'settings', component: SettingsComponent  }

	/*{ path: 'leads', component: LeadComponent  },*/
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
