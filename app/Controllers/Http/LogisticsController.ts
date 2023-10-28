import { Exception } from "@adonisjs/core/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import FailedCreateStoreException from "App/Exceptions/FailedCreateStoreException";
import FailedLogisticCreateException from "App/Exceptions/FailedLogisticCreateException";
import Logistic from "App/Models/Logistic";
import AddLogisticValidator from "App/Validators/AddLogisticValidator";
import cloudinary from "Config/cloudinary";

export default class LogisticsController {
  async addLogistic(ctx: HttpContextContract) {
    const { request, response } = ctx;

    await request.validate(AddLogisticValidator);

    const { name, description } = request.body();

    const image = request.file("image");

    try {
      let uploadImage = await cloudinary.uploader.upload(
        image?.tmpPath ? image.tmpPath : "",
        {
          unique_filename: true,
          folder: "/logistic",
        }
      );

      const createLogistic = await Logistic.create({
        name,
        description,
        imageName: uploadImage.public_id,
        imageUrl: uploadImage.secure_url,
      });

      return response.created({
        message: "Eklendi",
        status: true,
        data: createLogistic,
      });
    } catch (err) {
      throw new FailedLogisticCreateException();
    }
  }

  async getAll(ctx: HttpContextContract) {
    const { response } = ctx;

    const findAll = await Logistic.query();

    return response.ok({
      logistics: findAll,
    });
  }

  async deleteLogistic(ctx: HttpContextContract) {
    const { request, response } = ctx;

    const { logId } = request.qs();

    if (!logId) {
      return response.badRequest({
        message: "Lojistik ID gönderin",
        success: false,
      });
    }

    const findLog = await Logistic.findBy("id", logId);

    if (!findLog) {
      return response.notFound({
        message: "Lojistik bilgisi bulunamadı",
        success: false,
      });
    }

    findLog.delete();
    return response.ok({
      message: "Silindi",
    });
  }
}
