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
| new NotfoundUserException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class NotfoundUserException extends Exception {
    public async handle(ctx: HttpContextContract) {
        ctx.response.notFound(new ErrorResponse('Kullanıcı bulunamadı'))
      }
}
