import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddLogisticValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(50),
    ]),
    description: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(255),
    ]),

    image: schema.file({
      extnames: ["jpg", "jpeg", "png"],
      size: "2mb",
    }),
  });

  public messages: CustomMessages = {
    "name.required": "Lojistik adı zorunludur",
    "name.maxLength":
      "Lojistik adı maksimum {{options.maxLength}} karakter olmalı",

    "description.maxLength":
      "Lojistik açıklaması en fazla {{options.maxLength}} karakter olmalıdır",
    "description.required":'Lojistik açıklaması zorunludur',
    "image.required": "Depo resmi zorunludur",
    "file.size": "Dosya boyutu çok büyük!",
    "file.extnames": "Dosya uzantısı geçersiz",
  };
}
