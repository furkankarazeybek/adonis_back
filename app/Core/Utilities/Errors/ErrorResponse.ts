


export default class ErrorResponse {

    msg;
    code; 
    constructor(msg:string,code?:string) {
        this.msg = msg;
        this.code = code;
    }

}