import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { Exception } from '@adonisjs/core/build/standalone'
import ErrorResponse from 'App/Core/Utilities/Errors/ErrorResponse';

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new ForbiddenRequestException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class NotFoundCategoryException extends Exception {

    constructor() {
      super("Kategori bulunamadı",403)
    }

    public async handle() {
        return {
          message:this.message,
          code:403
        }
      }
}
