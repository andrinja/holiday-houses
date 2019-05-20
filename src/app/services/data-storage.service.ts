import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs';
// data retrieved from firebase service
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Property } from '../shared/property.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class DataStorageService {

  private user;
  
  constructor( public http: Http, 
              private firebase: AngularFireDatabase,
              private auth: AuthService) {
                this.user = this.auth.getUser();
              }

  getProperties()  {
    const userId = this.user.uid; 
    const properties = this.firebase
      .list<Property>(`users/${userId}/properties`)
      .query
      .once('value')

      return properties;
  }

  createProperty(property: Property) {
    const userId = this.user.uid;
    return this.firebase.list(`users/${userId}/properties`).push(property);
  }

  deleteProperty(property: Property) {
    const userId = this.user.uid;
    return this.firebase.list(`users/${userId}/properties`).remove(property._id);
  }
    
}
