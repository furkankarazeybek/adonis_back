import { schema,rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateAboutValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({

    header:schema.string({trim:true}, [
      rules.required()
    ]),
    content: schema.string({trim:true},[
      rules.required(),
      rules.minLength(10),
      rules.maxLength(350)
    ]),
    video_file: schema.file({extnames: ['mp4','png']},[rules.required()])
  })

  public messages: CustomMessages = {

    'header.required':'Başlık zorunludur',
    
    'content.required':"Bölüm içeriği zorunludur",
    'content.minLen':'Bölüm içeriği en az {{options.minlength}} karakter içermelidir',
    'content.maxLen':'Bölüm içeriği en fazla {{options.maxlength}} karakter içermelidir',

    'video_file.required':'Bölüm video içeriği zorunludur',
    'file.extname':'Video uzantısı geçersiz. Geçerli video uzantıları : {{options.extnames}}',

  }
}
