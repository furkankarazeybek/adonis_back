import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import FailedCreateStoreException from "App/Exceptions/FailedCreateStoreException";
import FailedUpdateStoreException from "App/Exceptions/FailedUpdateStoreException";
import NotFoundStoreException from "App/Exceptions/NotFoundStoreException";
import Store from "App/Models/Store";
import AddStoreValidator from "App/Validators/AddStoreValidator";
import UpdateStoreValidator from "App/Validators/UpdateStoreValidator";
import cloudinary from "Config/cloudinary";

export default class StoresController {
  async addStore(ctx: HttpContextContract) {
    const { request, response } = ctx;

    await request.validate(new AddStoreValidator(ctx));

    const { storeName, storeDescription } = request.body();

    const storeImage = request.file("image");

    try {
      let uploadImage = await cloudinary.uploader.upload(
        storeImage?.tmpPath ? storeImage.tmpPath : "",
        {
          unique_filename: true,
          folder: "/stores",
        }
      );


      const createStore = await Store.create({
        storeDescription,
        storeName,
        publicId: uploadImage.public_id,
        secureUrl: uploadImage.secure_url,
      });

      return response.created({
        message: "Depo eklendi",
        status: true,
        data: createStore,
      });
    } catch (err) {
      throw new FailedCreateStoreException();
    }
  }

  async updateStore(ctx: HttpContextContract) {
    const { request, response } = ctx;

    await request.validate(new UpdateStoreValidator(ctx));

    const { storeId, storeName, storeDescription } = request.body();
    const storeImage = request.file("storeImage");

    const findStore = await Store.findBy("id", storeId);

    if (!findStore) {
      throw new NotFoundStoreException();
    }

    findStore.storeName = storeName;
    findStore.storeDescription = storeDescription;

    if (storeImage) {
      try {
        await cloudinary.uploader.upload(
          storeImage?.tmpPath ? storeImage.tmpPath : "",
          {
            public_id: findStore.publicId,
          }
        );
      } catch (err) {
        throw new FailedUpdateStoreException();
      }
    }

    await findStore.save();

    return response.ok({
      message: "Depo güncellendi",
      status: true,
    });
  }

  async getAllStores(ctx: HttpContextContract) {
    const { request, response } = ctx;

    const findAll = await Store.query();

    return response.ok({
      stores: findAll,
    });
  }

  async deleteStore(ctx: HttpContextContract) {
    const { request, response } = ctx;

    const { storeId } = request.qs();

    if (!storeId) {
      return response.badRequest(({
        message:'Hatalı istek.Depo ID göndermedin',
        status:false
      }))
    }

    const findStore = await Store.findBy("id", storeId);

    if (!findStore) {
      throw new NotFoundStoreException();
    }

    await findStore.delete();

    return response.ok({
      message: "Depo kaldırıldı",
      status: true,
    });
  }
}
