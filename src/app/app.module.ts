import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DatePipe} from '@angular/common';
import { AppComponent } from './app.component';
import { AddprojectComponent } from './UI/addproject/addproject.component';
import { AddtaskComponent } from './UI/addtask/addtask.component';
import { AdduserComponent } from './UI/adduser/adduser.component';
import { ViewtaskComponent } from './UI/viewtask/viewtask.component';
import { routing } from 'src/app/app.router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SortPipe } from './Pipe/sort.pipe';
import { DateSortPipe } from './Pipe/datesort.pipe';
@NgModule({
  declarations: [
    AppComponent,
    AddprojectComponent,
    AddtaskComponent,
    AdduserComponent,
    ViewtaskComponent,
    SortPipe,
    DateSortPipe
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule 
  ], 
  providers: [DatePipe,SortPipe,DateSortPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
