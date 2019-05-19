export enum typeOperation {
    income = 'income',
    withdrawal = 'withdrawal'
}

export class Operation {
    description: string;
    amount: number;
    type: typeOperation;
    create: number;
    uid?: string;

    constructor( objectInput: OperationObjectInput ) {
        this.description = objectInput && objectInput.description || null;
        this.amount = objectInput && objectInput.amount || null;
        this.type = objectInput && objectInput.type || null;
        this.create = objectInput && objectInput.create || new Date().getTime();
    }

}

interface OperationObjectInput {
    description: string;
    amount: number;
    type: typeOperation;
    create: number;
    uid?: string;
}
