import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdateStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    storeId: schema.number([rules.required()]),
    storeName: schema.string({ trim: true }, [rules.maxLength(50)]),
    storeDescription: schema.string({ trim: true }, [
      rules.minLength(10),
      rules.maxLength(255),
    ]),
    image: schema.file.optional({
      extnames: ["jpg", "jpeg", "png"],
      size: "2mb",
    }),
  });

  public messages: CustomMessages = {
    "storeId.required": "Depo ID bilgisi zorunludur",
    "storeId.number": "Gerçesiz ID bilgisi gönderdiniz",

    "storeName.maxLength":
      "Depo adı maksimum {{options.maxLength}} karakter olmalı",

    "storeName.required": "Mağaza adı zorunludur",

    "storeDescription.minLength":
      "Depo açıklaması en az {{options.minLength}} karakter olmalıdır",
    "storeDescription.required": "Mağaza açıklaması zorunludur",
    "storeDescription.maxLength":
      "Depo açıklaması en fazla {{options.maxLength}} karakter olmalıdır",

    "file.size": "Dosya boyutu çok büyük!",
    "file.extnames": "Dosya uzantısı geçersiz",
  };
}
