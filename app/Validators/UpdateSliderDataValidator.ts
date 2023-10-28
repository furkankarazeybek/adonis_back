import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateSliderDataValidator {
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
    id: schema.number([rules.required()]),
    order: schema.number([rules.unique({
      table:'sliders',
      column:'slider_order'
    }),rules.required()]),
    sliderSeo: schema.string([rules.required(),rules.maxLength(50)])
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
    'id.required':"Slider ID bilgisi zorunludur",
    'order.unique':"Bu sıralamada başka bir resim var",
    'order.required':"Sıralama bilgisi zorunludur",

    'sliderSeo.required':"Seo bilgisi zorunludur",
    'sliderSeo.maxLength':'Seo bilgisi en fazla {{options.maxLength}} karakter olabilir.'
  }
}
