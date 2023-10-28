import { schema,rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SignupValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    firstName: schema.string({trim:true}, [
      rules.required(),
      rules.maxLength(255),
    ]),
    lastName: schema.string({trim:true}, [
      rules.required(),
      rules.maxLength(255)
    ]),
    email: schema.string({trim:true}, [
      rules.required(),
      rules.email(),
      rules.unique({
        column:'email',
        table:'users'
      }),
      rules.maxLength(255),
    ]),
    password: schema.string({trim:true}, [
      rules.required(),
      rules.minLength(6)
    ]),
    phone: schema.string({trim:true}, [
      rules.minLength(11),
      rules.maxLength(11),
      rules.required(),
      rules.unique({
        table:'users',
        column:'phone'
      })

    ])
  })

  public messages: CustomMessages = {
    'firstName.required':'Ad alanı zorunludur',
    'firstName.maxLength':'Ad en fazla {{options.maxLength}} karakter olabilir',

    'lastName.required':'Soyad alanı zorunludur',
    'lastName.maxLength':'Soyad en fazla {{options.maxLength}} karakter olabilir',

    'email.required':'E-Posta zorunludur',
    'email.email':'Lütfen geçerli bir e-posta adresi gönderin',
    'email.unique':'Belirtilen e-posta adresi kullanılıyor',
    'email.maxLength':'E-Posta en fazla {{options.maxLength}} karakter olabilir',

    'password.required':'Şifre zorunludur',
    'password.minLength':'Şifre en az {{options.minLength}} karakter olmalıdır',


    'phone.minLength':'Telefon numarası 11 karakter olmalıdır',
    'phone.maxLength':'Telefon numarası 11 karakter olmalıdır',
    'phone.required':'Telefon numarası zorunludur',
    'phone.unique':'Telefon numarası başka bir hesapta kullanımda'
  }
}
