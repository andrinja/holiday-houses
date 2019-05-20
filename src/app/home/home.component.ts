import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { DataStorageService } from '../services/data-storage.service';
import { Response } from '@angular/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor(public userService: UserService,
              public dataStorageService: DataStorageService) {
      
   }

  ngOnInit() {}

  onSave() {
    // this.dataStorageService.storeProperties()
    //  // use subscribe in the component to handle error event
    //       .subscribe(
    //         (response: Response) => {
    //           // console.log(response);
    //         }
    //       );
  }

  onGetData() {
    // this.dataStorageService.getProperties();
    
  }

}
