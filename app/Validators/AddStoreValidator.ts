import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AddStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    storeName: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(50),
    ]),
    storeDescription: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(255),
    ]),

    image: schema.file({
      extnames: ["jpg", "jpeg", "png"],
      size: "2mb",
    }),
  });

  public messages: CustomMessages = {
    "storeName.required": "Depo adı zorunludur",
    "storeName.maxLength":
      "Depo adı maksimum {{options.maxLength}} karakter olmalı",

    "storeDescription.maxLength":
      "Depo açıklaması en fazla {{options.maxLength}} karakter olmalıdır",
    "storeDescription.required":'Depo açıklaması zorunludur',
    "image.required": "Depo resmi zorunludur",
    "file.size": "Dosya boyutu çok büyük!",
    "file.extnames": "Dosya uzantısı geçersiz",
  };
}
