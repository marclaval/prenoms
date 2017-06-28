import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { YearComponent } from './year/year.component';
import { NameComponent } from './name/name.component';

import { DataService } from './data.service';
import { ConfigService } from './config.service';

const appRoutes: Routes = [
  {path: '', children: []},
  {path: 'name', component: NameComponent},
  {path: 'year', component: YearComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    YearComponent,
    NameComponent
  ],
  imports: [
    BrowserModule, CommonModule, FormsModule, RouterModule.forRoot(appRoutes, {useHash: true}), NgbButtonsModule
  ],
  providers: [DataService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(dataService: DataService, config: ConfigService) {

  }
}
