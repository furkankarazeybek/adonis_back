import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Contact from "App/Models/Contact";
import AddContactValidator from "App/Validators/AddContactValidator";

export default class ContactsController {
  async addContact(ctx: HttpContextContract) {
    const { request, response } = ctx;

    await request.validate(new AddContactValidator(ctx));

    const { nameSurname, email, phoneNumber, message } =
      request.body() || request.qs();


    await Contact.create({
      email,
      message,
      phoneNumber,
      nameSurname,
    });

    return response.ok({
      message: "Mesajınız gönderildi",
      status: true,
    });
  }
}
