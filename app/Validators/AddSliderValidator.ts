import { schema,rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddSliderValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    webImage: schema.file({extnames: ['png','jpg']},[rules.required()]),
    mobileImage: schema.file({extnames: ['png','jpg']},[rules.required()]),
    order: schema.number([rules.required(),rules.range(1,50)]),
    sliderSeo: schema.string([rules.required(),rules.maxLength(50)])

  })

  public messages: CustomMessages = {
    'file.extnames':'Dosya uzantısı geçersiz. Geçerli dosya uzantıları {{options.extnames}}',
    'webImage.required':"Web görseli zorunludur.",
    'mobileImage.required':"Mobil görseli zorunludur.",

    'order.required':"Resim sırası zorunludur",
    'order.range':"Sıra en az {{options.start}}, en fazla {{options.stop}} olabilir.",

    'sliderSeo.required':"Seo yazısı zorunludur",
    'sliderSeo.maxLength':"Seo yazısı en fazla {{options.maxLenght}} olmalıdır",

    
  }
}
