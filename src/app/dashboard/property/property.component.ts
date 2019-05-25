import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Property } from 'src/app/shared/property.model';
import { PropertyActions } from '../store/properties.actions';


@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  @Input() property: Property;
  @Output() nameOfTheEventOr: EventEmitter<any> = new EventEmitter<any>();
  constructor(private propertyActions: PropertyActions) { }

  ngOnInit() {
  }

  onPropertyDelete(property: Property) {
    this.propertyActions.deleteProperty(property);
  }
    
}
