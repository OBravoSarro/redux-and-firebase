export class User {
    public email: string;
    public uid?: string;
    public name?: string;
    public password?: string;

    constructor( objectInput: DataObjectInput ) {
        this.name = objectInput && objectInput.name || null;
        this.uid = objectInput && objectInput.uid || null;
        this.email = objectInput && objectInput.email || null;
    }
}

interface DataObjectInput {
    uid: string;
    email: string;
    name: string;
}
