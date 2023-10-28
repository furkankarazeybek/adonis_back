import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SignupValidator from "App/Validators/SignupValidator";
import User from "App/Models/User";
import { SignupResponse } from "App/Core/Utilities/Response/SignupResponse";
import Database from "@ioc:Adonis/Lucid/Database";
import LoginValidator from "App/Validators/LoginValidator";
import { passwordControl } from "App/Core/Utilities/Hash/PasswordControl";
import { LoginResponse } from "App/Core/Utilities/Response/LoginResponse";
import NotfoundUserException from "App/Exceptions/NotfoundUserException";
import { Roles } from "App/Core/Utilities/Roles/Roles";

export default class AuthController {
  async signup(ctx: HttpContextContract) {
    const { request, response } = ctx;

    await request.validate(new SignupValidator(ctx));

    const { firstName, lastName, email, phone, password } = request.body();

    await Database.transaction(async (trx) => {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        phone,
      });

      await user.useTransaction(trx);
    });

    return response.ok(new SignupResponse("Hesabınız oluşturuldu"));
  }

  async signin(ctx: HttpContextContract) {
    const { request, response, auth } = ctx;

    await request.validate(new LoginValidator(ctx));

    const { email, password } = request.body();

    const user = await User.findBy("email", email);

    if (!user) {
      throw new NotfoundUserException("");
    }

    await passwordControl(password, user.password);

    const token = await auth.use("api").generate(user);

    return response.ok(
      new LoginResponse("Oturum başlatıldı", {
        currentUser: user.toJSON(),
        isAdmin: user.role === Roles.ADMIN ? true : false,
        token: token.token,
      })
    );
  }

  async checkToken(ctx: HttpContextContract) {
    const { response, auth } = ctx;

    return response.ok({
      currentUser: auth.user?.toJSON(),
      isAdmin: auth.user?.role === Roles.ADMIN ? true : false,
    });
  }

  async logout(ctx: HttpContextContract) {
    const { response, auth } = ctx;

    await auth.use("api").logout();

    return response.ok({
      message: "Oturum sonlandırıldı",
      status: false,
    });
  }
}
