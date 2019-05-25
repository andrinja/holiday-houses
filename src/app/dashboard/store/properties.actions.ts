import { Property } from '../../shared/property.model';
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './store';
import { DataStorageService } from '../../services/data-storage.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';


@Injectable({ providedIn: 'root'})

export class PropertyActions {
  constructor(
            private ngRedux: NgRedux<AppState>,
            private api: DataStorageService,
            private router: Router,
            private afStorage: AngularFireStorage) {}

    static GET_PROPERTIES_SUCCESS: string = 'GET_PROPERTIES_SUCCESS';
    static GET_PROPERTIES_FAILURE: string = 'GET_PROPERTIES_FAILURE';
    static GET_PROPERTIES_LOADING: string = 'GET_PROPERTIES_LOADING';

    static CREATE_PROPERTY: string = 'CREATE_PROPERTY';
    static DELETE_PROPERTY: string = 'DELETE_PROPERTY';
    static UPDATE_PROPERTY: string = 'UPDATE_PROPERTY';

    getProperties() {
      this.ngRedux.dispatch({type: PropertyActions.GET_PROPERTIES_LOADING});
      
      this.api.getProperties().then( response => {

        let properties = []; 

   
        const responseValue = response.val();
        if (responseValue != undefined && responseValue != null) {
          for (let [key, property] of Object.entries(responseValue)) {

            const imagePath = property['imagePath'];

            if (imagePath) {
              const ref = this.afStorage.ref(imagePath);
              ref.getDownloadURL().toPromise().then( url => {
                property['imagePath'] = url;

                properties.push({
                  _id: key,
                  ...property
                })

              })
            } else {
              properties.push({
                _id: key,
                ...property
              })
            }
          }
        }

        this.ngRedux.dispatch({
          type: PropertyActions.GET_PROPERTIES_SUCCESS,
          payload: properties
        });
      });
      
    }

    createNewProperty(property: Property) : void {
      this.api.createProperty(property).then(data => {
        property._id = data.key;
        this.ngRedux.dispatch({
          type: PropertyActions.CREATE_PROPERTY,
          payload: property
        })

        this.router.navigate(['/dashboard/properties']);
      })      
    }

    deleteProperty(property: Property) :void {

      this.api.deleteProperty(property).then(data => {
        this.ngRedux.dispatch({
          type: PropertyActions.DELETE_PROPERTY,
          payload: property
        })
      })

    }

    updateProperty(property: Property, id: string) : void {
      this.api.updateProperty(property, id);

      this.ngRedux.dispatch({
        type: PropertyActions.UPDATE_PROPERTY,
        payload: {
          _id: id,
          ...property
        }
      })
      
      this.router.navigate(['/dashboard/properties']);
    }
}