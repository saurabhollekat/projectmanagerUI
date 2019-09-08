import { Router, ROUTES } from '@angular/router'
import { Routes } from '@angular/router/src/config';
import { RouterModule } from '@angular/router';
import { AddprojectComponent } from 'src/app/UI/addproject/addproject.component';
import { AddtaskComponent } from 'src/app/UI/addtask/addtask.component';
import { AdduserComponent } from 'src/app/UI/adduser/adduser.component';
import { ViewtaskComponent } from 'src/app/UI/viewtask/viewtask.component';


const APP_ROUTES: Routes = [
    { path: '', component: AddprojectComponent },
    { path: 'addtask', component: AddtaskComponent },
    { path: 'adduser', component: AdduserComponent },
    { path: 'viewtask', component: ViewtaskComponent },
    { path: 'updatetask/:id', component: AddtaskComponent },
]

export const routing = RouterModule.forRoot(APP_ROUTES);