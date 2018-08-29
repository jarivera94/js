import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <--- NgModel lives here!
import { routing, appRoutingProviders } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthModule } from './auth.module';
import { DashboardComponent, ProjectComponent, CampaignComponent, LeadComponent, AccountComponent, ContactComponent, OpportunityComponent, SettingsComponent, CallsComponent, formLeadComponent, viewLeadComponent, formOpportunityComponent, viewOpportunityComponent, formAccountComponent, viewAccountComponent, formContactComponent  } from './components/index';
import { MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatCheckboxModule, MatTabsModule, MatTooltipModule, MatAutocompleteModule, MatChipsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask/src/currency-mask.config";
import { NgxPaginationModule } from 'ngx-pagination';
import { opportunityFilter } from './pipes/filter.opportunity.pipe';
import { PointReplacerPipe } from './pipes/thousand.dots.pipe';
import { InitialChartsPipe } from './pipes/initials.charts.pipe';
import { leadConvertedFilter } from './pipes/filter.leads.converted.pipe';
import { trasnlateStatePipe } from './pipes/translate.state.pipe';



export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 0,
    prefix: "$ ",
    suffix: "",
    thousands: "."
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProjectComponent,
    CampaignComponent,
    LeadComponent,
    AccountComponent,
    ContactComponent,
    OpportunityComponent,
    SettingsComponent,
    CallsComponent,
    formLeadComponent,
    viewLeadComponent,
    formOpportunityComponent,
    viewOpportunityComponent,
    formAccountComponent,
    viewAccountComponent,
    formContactComponent,
    opportunityFilter,
    PointReplacerPipe,
    InitialChartsPipe,
    leadConvertedFilter,
    trasnlateStatePipe
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    routing,
    AuthModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatTabsModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatChipsModule,
    BrowserAnimationsModule,
    CurrencyMaskModule,
    NgxPaginationModule
  ],
  providers: [appRoutingProviders, { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
