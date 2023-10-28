
import User from 'App/Models/User';

export class SignupResponse {

    msg:string;
    data?:User;

    constructor(msg:string,data?:User) {
        this.msg = msg;
        this.data = data;
    }




}
