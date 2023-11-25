import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Routes = [
  {path:'', component:UserComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'user', component:UserComponent},
  {path:'user/:id', component:UserDetailComponent},
  {path:'imprint', component:ImprintComponent},
  {path:'privacy', component:PrivacyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
