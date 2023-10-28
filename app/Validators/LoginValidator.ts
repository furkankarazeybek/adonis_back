import { schema,rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    email:schema.string({trim:true}, [
      rules.required(),
      rules.email()
    ]),
    password: schema.string({trim:true}, [
      rules.required()
    ])

  })

  public messages: CustomMessages = {
    'email.required':'E-Posta zorunludur',
    'email.email':'Lütfen geçerli bir e-posta adresi girin',
    
    'password.required':'Şifre zorunludur'
  }
}
