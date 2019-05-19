import { Action } from '@ngrx/store';
import { Operation } from '../operations.model';

export const SET_ITEMS = '[Operations] Set Items';
export const UNSET_ITEMS = '[Operations] Unset Items';

export class SetItemsAction implements Action {
    readonly type = SET_ITEMS;
    constructor(public items: Operation[]) {}
}

export class UnsetItemsAction implements Action {
    readonly type = UNSET_ITEMS;
}

export type actions = SetItemsAction |  UnsetItemsAction;
