import { Injectable } from '@angular/core';
import { Property } from '../shared/property.model';
import { Amenity } from '../shared/amenity.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PropertyService {
  // use subject to let the app know about the changes
  propertiesChanged = new Subject<Property[]>();

    public properties: Property[] = [
    new Property(
      'Gravas guesthouse',
      'Some description here',
      'https://image.jimcdn.com/app/cms/image/transf/dimension=origxorig:format=jpg/path/sf4a66f93c5c949d3/image/i35e3333efce5f209/version/1533065119/nice-big-rooms-at-the-cumbuco-guesthouse.jpg',
      'Bauska, Likverteni',
      'Latvia',
      [new Amenity('Washer', 'washer description here')]
    )
  ]

  constructor() { }

  // getProperties() {
  //   return this.properties.slice();
  // }

  // setProperties(properties: Property[]) {
  //   this.properties = properties;
  //   this.propertiesChanged.next(this.properties.slice());
  // }
}
