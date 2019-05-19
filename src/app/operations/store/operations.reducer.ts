import * as fromOperations from './operations.actions';
import { Operation } from '../operations.model';

export interface OperationsState {
    items: Operation[];
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
