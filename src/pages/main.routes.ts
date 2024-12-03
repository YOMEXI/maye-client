import { Routes } from '@angular/router';
import { MainComponent } from './dashboard/main.component';
import { RegisterStaffComponent } from './dashboard/staff/register-staff.component';
import { HomeComponent } from './dashboard/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'staff/register', component: RegisterStaffComponent },
      { path: '', component: HomeComponent },
    ],
  },
];
