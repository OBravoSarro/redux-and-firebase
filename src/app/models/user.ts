export class User {
    public email: string;
    public uid?: string;
    public name?: string;
    public password?: string;

    constructor( name: string, email: string, uid: string ) {
        this.name = name;
        this.uid = uid;
        this.email = email;
    }
}
