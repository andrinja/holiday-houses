import { PropertyState } from './store';
import { PropertyService } from '../../services/property.service';
import { Property } from 'src/app/shared/property.model';
import { Amenity } from 'src/app/shared/amenity.model';
import { tassign } from 'tassign';
import { PropertyActions } from './properties.actions';

const INITIAL_STATE: PropertyState = {
    properties: [], 
    isLoading: false
}; 

export function propertyReducer(state: PropertyState = INITIAL_STATE, action: any) {
    switch(action.type) {
        case PropertyActions.GET_PROPERTIES_LOADING:
            return tassign(state, {isLoading: true});

        case PropertyActions.GET_PROPERTIES_SUCCESS:
            return tassign(state, {properties: action.payload, isLoading: false});
        
        case PropertyActions.GET_PROPERTIES_FAILURE:
            return tassign(state, {isLoading: false});
        
        case PropertyActions.CREATE_PROPERTY:

            return tassign(state, { properties: [...state.properties, action.payload]});
        case PropertyActions.DELETE_PROPERTY:
            const newPropertiesAfterDelete = state.properties.filter(property => 
                                           property._id !== action.payload._id);
            return tassign(state, {properties: newPropertiesAfterDelete});
        case PropertyActions.UPDATE_PROPERTY:
        let newPropertiesAfterUpdate = state.properties.map(property => {
            if (property._id === action.payload._id) {
                return action.payload
            }
            return property;
        })
        return tassign(state, {properties: newPropertiesAfterUpdate});
        default:
            return state;
    }
    
}