import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PropertyActions } from '../store/properties.actions';
import { Property } from 'src/app/shared/property.model';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { TaskData } from '@angular/core/src/testability/testability';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.scss']
})
export class CreatePropertyComponent implements OnInit {
  locations = ['Denmark', 'Sweden', 'Norway'];
  propertyForm: FormGroup;
  ref: AngularFireStorageReference;
  uploadTask: AngularFireUploadTask;
  selectedFile = null;
  propertyImagePath = [];

  constructor( private PropertyActions: PropertyActions,
                private afStorage: AngularFireStorage) { }

  ngOnInit() {
      this.propertyForm = new FormGroup({
        'name': new FormControl(null, Validators.required),
        'description': new FormControl(null, Validators.required),
        'address': new FormControl(null, Validators.required),
        'location': new FormControl('Denmark', Validators.required)
      })
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    let property = this.propertyForm.value as Property;

    if (this.selectedFile) {
      //first upload image, so we can refer to it in creatr property

      //create random string for id
      const id = Math.random().toString(36).substring(2);

      //create reference
      this.ref = this.afStorage.ref(id);

      //start uploading
      this.uploadTask = this.ref.put(this.selectedFile);

      //wait for upload to finish
       this.uploadTask.then( response => {

        //save image path on property
        property.imagePath = response.metadata.fullPath;

        //create property
        this.PropertyActions.createNewProperty(property);
       });
    }
    else {
      this.PropertyActions.createNewProperty(property);
    }
  }
}
