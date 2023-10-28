import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Roles } from 'App/Core/Utilities/Roles/Roles'
import ForbiddenRequestException from 'App/Exceptions/ForbiddenRequestException'

export default class Admin {
  public async handle({auth}: HttpContextContract, next: () => Promise<void>) {
    if(auth.user?.role != Roles.ADMIN) {
      throw new ForbiddenRequestException();
    }

    await next()
  }
}
