import { Action } from '@ngrx/store';
import { User } from '../models/user';

export const SET_USER = '[Auth] Set user';

export class SetUserAction implements Action {
    readonly type = SET_USER;
    constructor (public user: User) {}
}

export type actions = SetUserAction ;
