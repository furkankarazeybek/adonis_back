import { schema,rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductCategoryAddValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    categoryName: schema.string({trim:true}, [
      rules.required(),
      rules.unique({
        column:'name',
        table:'categories'
      })
    ])


  })
  public messages: CustomMessages = {
    'categoryName.required':'Kategori adı zorunlu alandır',
    'categoryName.unique':'Bu kategori adı zaten kayıtlı'
  }
}
