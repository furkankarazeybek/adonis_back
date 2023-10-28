import { schema,rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateCategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({

    id: schema.number([
      rules.required(),
      rules.unsigned()
    ]),
    categoryName:schema.string({trim:true},[
      rules.required(),
      rules.unique({
        column:'name',
        table:'categories'
      }),
      rules.maxLength(255)
    ])

  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'categoryName.required':'Yeni kategori adı zorunludur',
    'categoryName.unique':'Yeni kategori adı zaten alınmış',
    'categoryName.maxLength':'Kategori adı en fazla {{options.length}} karakter olabilir.',
    'id.required':'Id bilgisi zorunludur',
    'id.unsigned':'Lütfen geçerli bir id bilgisi gönderin.'
  }
}
