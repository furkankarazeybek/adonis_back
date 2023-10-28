import { schema,rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddContactValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    nameSurname: schema.string({trim:true},[rules.required(),rules.maxLength(50)]),
    phoneNumber: schema.string({trim:true},[rules.required(),rules.maxLength(20)]),
    email: schema.string({trim:true},[rules.required(),rules.email(),rules.maxLength(255)]),
    message: schema.string({trim:true},[rules.required(),rules.maxLength(750)]),
  })


  public messages: CustomMessages = {
    'nameSurname.required':'Ad Soyad zorunludur',
    'nameSurname.maxLength':'Ad Soyad maksimum {{options.maxLength}} karakter olabilir',
    'phoneNumber.required':'Telefon Numarası zorunludur',
    'phoneNumber.maxLength':'Telefon numarası maksimum {{options.maxLength}} karakter olabilir',
    'email.required':'E-Posta zorunludur',
    'email.email':'Geçersiz e-posta adresi',
    'email.maxLength':'E-Posta en fazla {{options.maxLength}} karakter olabilir',
    'message.required':'Mesaj zorunludur',
    'message.maxLength':'Mesaj maksimum {{options.maxLength}} karakter olabilir.'
  }
}
