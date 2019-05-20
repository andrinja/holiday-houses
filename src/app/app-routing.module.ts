
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './core/auth.guard';
import { UserResolver } from './core/user.resolver';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PropertyListComponent } from './dashboard/property-list/property-list.component';
import { CreatePropertyComponent } from './dashboard/create-property/create-property.component';
import { EditPropertyComponent } from './dashboard/edit-property/edit-property.component';
//import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// Defining your routes
const routes: Routes = [

  
  {path: 'home', component: HomeComponent},

  {path: 'user', component: UserComponent,  
                 canActivate: [AuthGuard], 
                 resolve: { data: UserResolver}},  
  {path: 'dashboard', component: DashboardComponent,
                     canActivate: [AuthGuard], children: [
    {path: 'properties', component: PropertyListComponent},
    {path: 'property/create', component: CreatePropertyComponent},
    {path: 'property/:id/edit', component: EditPropertyComponent},
  ]
},

  {path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  // redirect to default route
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
    // wildcard route to intercept invalid URLs
  { path: '**', component: PageNotFoundComponent }
 ];
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
