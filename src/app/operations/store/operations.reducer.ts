import * as fromOperations from './operations.actions';
import { Operation } from '../operations.model';
import { AppState } from '../../app.reducer';

export interface OperationsState {
    items: Operation[];
}

export interface AppState extends AppState {
    operations: OperationsState;
}

const initState: OperationsState = {
    items: []
};

export function operationsReducer(state = initState, action: fromOperations.actions): OperationsState {
    switch (action.type) {
        case fromOperations.SET_ITEMS:
            return {items: [...action.items]};
        case fromOperations.UNSET_ITEMS:
            return {items: []};
        default:
            return state;
    }
}
