import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from './enviroments/enviroment';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { AppState } from './dashboard/store/store';
import { rootReducer } from './dashboard/store/store';
// material design
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDividerModule, MatCardModule, MatRadioModule, MatSnackBarModule, MatButtonModule, MatToolbarModule, MatTooltipModule, MatIconModule, MatMenuModule, MatGridListModule, MatNativeDateModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


// Components
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserComponent } from './user/user.component';




// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Services
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { PropertyService } from './services/property.service';
import { DataStorageService } from './services/data-storage.service';


import { AuthGuard } from './core/auth.guard';
import { UserResolver } from './core/user.resolver';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PropertyListComponent } from './dashboard/property-list/property-list.component';
import { PropertyComponent } from './dashboard/property/property.component';
import { CreatePropertyComponent } from './dashboard/create-property/create-property.component';
import { EditPropertyComponent } from './dashboard/edit-property/edit-property.component';


export const firebaseConfig = environment.firebaseConfig;
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    UserComponent,
    DashboardComponent,
    PropertyListComponent,
    PropertyComponent,
    CreatePropertyComponent,
    EditPropertyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule, MatCardModule, MatSnackBarModule, MatButtonModule, MatToolbarModule, MatTooltipModule, MatIconModule, MatMenuModule, MatGridListModule, MatNativeDateModule, MatRadioModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    HttpModule,
    NgReduxModule, NgReduxRouterModule.forRoot(),
    HttpClientModule,
    AngularFirestoreModule
  ],
  // to be able to inject service into another service
  providers: [AuthService, UserService, PropertyService, DataStorageService, AuthGuard, UserResolver],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private ngRedux: NgRedux<AppState>,
              private devTool: DevToolsExtension,
              private ngReduxRouter: NgReduxRouter) {
      this.ngRedux.configureStore(rootReducer, {}, [],[ devTool.isEnabled() ? devTool.enhancer() : f => f]);
 
      ngReduxRouter.initialize(/* args */);   
  }
}



