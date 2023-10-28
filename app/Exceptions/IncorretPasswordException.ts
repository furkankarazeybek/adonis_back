import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { Exception } from "@adonisjs/core/build/standalone";
import ErrorResponse from "App/Core/Utilities/Errors/ErrorResponse";


export default class IncorretPasswordException extends Exception {
  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response.status(error.status).send(new ErrorResponse(error.message,error.code));
  }
}
