import { Exception } from '@adonisjs/core/build/standalone'

export default class FailedLogisticCreateException extends Exception {

    constructor(err?:any) {
        super("Oluşturulurken bir problem oluştu: " + err,500)
    }

    handle() {
        return {
            message:this.message,
            code:this.code
        }
    }

}
