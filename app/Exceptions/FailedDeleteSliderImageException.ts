import { Exception } from '@adonisjs/core/build/standalone'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new FailedUploadSliderImageException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class FailedDeleteSliderImageException extends Exception {

    constructor() {
        super("Resim silinirken bir problem oluştu",500)
    }

    handle() {
        return {
            message:this.message,
            code:this.code
        }
    }

}
