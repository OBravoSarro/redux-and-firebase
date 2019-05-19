import { ActionReducerMap } from '@ngrx/store';
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromOperations from './operations/store/operations.reducer';

export interface AppState {
    ui: fromUI.State;
    auth: fromAuth.AuthState;
    operations: fromOperations.OperationsState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer,
    operations: fromOperations.operationsReducer
};
