import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
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
| new DeleteNotSuccessException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class DeleteNotSuccessException extends Exception {
    public async handle(error: this, ctx: HttpContextContract) {
        ctx.response.forbidden(new ErrorResponse(error.message,error.code));
      }
}
