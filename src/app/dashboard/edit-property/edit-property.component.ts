import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/shared/property.model';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store/store';
import { PropertyActions } from '../store/properties.actions';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { select } from '@ngrx/store';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';


@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss']
})
export class EditPropertyComponent implements OnInit {
  property: Property;
  // editPropertyForm: FormGroup;
  locations = ['Denmark', 'Sweden', 'Norway'];
  isLoading: boolean;
  editPropertyForm: FormGroup;
  deleteImage: boolean;
  selectedFile: null;
  ref: AngularFireStorageReference;
  uploadTask: AngularFireUploadTask;

  constructor( private route: ActivatedRoute,
               private ngRedux: NgRedux<AppState>,
               private PropertyActions: PropertyActions,
               private afStorage: AngularFireStorage
               ) { 
                this.editPropertyForm = new FormGroup({
                  name:         new FormControl('', Validators.required),
                  description:  new FormControl('', Validators.required),
                  address:      new FormControl('', Validators.required),
                  location:     new FormControl('', Validators.required)
                })
               }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.ngRedux.select(state => state.properties).subscribe( 
        response => {
        this.isLoading = response.isLoading;
        if (! response.isLoading) {
          // get the data here
          this.property = response.properties.find( property => id === property._id);
          //set form data from the property
          this.editPropertyForm.controls['name'].setValue(this.property.name);
          this.editPropertyForm.controls['description'].setValue(this.property.description);
          this.editPropertyForm.controls['address'].setValue(this.property.address);
          this.editPropertyForm.controls['location'].setValue(this.property.location);
        }
    })
  }

  onSubmit() {
    let property = this.editPropertyForm.value as Property;

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
        this.PropertyActions.updateProperty(property, this.property._id);
       });
    }
    else if(this.deleteImage) {
      this.PropertyActions.updateProperty({
        ...property,
        imagePath: null
      }, this.property._id);
    } else {
      this.PropertyActions.updateProperty({
        ...property,
        imagePath: this.property.imagePath
      }, this.property._id);
    }
  }

  onDeleteImage() {
    this.deleteImage = true;
    this.property.imagePath = null;
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  onClearSelectedFile() {
    this.selectedFile = null;
  }


  
}
