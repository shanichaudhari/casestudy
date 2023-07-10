import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path:'', component:WelcomeComponent },
  { path:'login', component:LoginComponent },
  { path:'home', component:HomeComponent, canActivate:[AuthGuard] },
  { path:'employee', component:EmployeeComponent, canActivate:[AuthGuard] },
  { path:'**', component:NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
