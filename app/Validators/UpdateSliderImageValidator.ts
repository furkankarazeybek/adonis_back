import { schema,rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateSliderImageValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    id:schema.number([
      rules.required(),
      rules.unsigned()
    ]),
    
    image:schema.file({
      extnames:['png'],
    })


  })
  public messages: CustomMessages = {

    'id.required':'Id bilgisi zorunludur',
    'id.unsigned':'Lütfen geçerli bir id bilgisi gönderin',

    'image.required':'Resim zorunludur',
    'file.extname':'Resim uzantısı geçersiz.Geçerli uzantılar {{options.extnames}}'



  }
}
