import { Property } from '../../shared/property.model';
import { combineReducers } from '@ngrx/store';
import { propertyReducer } from './properties.reducer';
import { routerReducer } from '@angular-redux/router';

export class PropertyState {
    properties: Property[];
    isLoading: boolean;
}

export class AppState {
    properties?: PropertyState;
}

// combineReducers calls every child reducer, and gathers their results into a single state object.
export const rootReducer = combineReducers<AppState>({
    properties: propertyReducer,
    router: routerReducer
} as any);

