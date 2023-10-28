

import User from 'App/Models/User';

export class LoginResponse {

    msg:string;
    data?:Object;

    constructor(msg:string,data?:Object) {
        this.msg = msg;
        this.data = data;
    }
}


