import Application from "@ioc:Adonis/Core/Application";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { SliderCreatedResponse } from "App/Core/Utilities/Response/SliderCreatedResponse";
import { UpdateSliderImageResponse } from "App/Core/Utilities/Response/UpdateSliderImageResponse";
import DeleteNotSuccessException from "App/Exceptions/DeleteNotSuccessException";
import FailedDeleteSliderImageException from "App/Exceptions/FailedDeleteSliderImageException";
import FailedUploadSliderImageException from "App/Exceptions/FailedUploadSliderImageException";
import NotfoundimageException from "App/Exceptions/NotfoundimageException";
import Slider from "App/Models/Slider";
import AddSliderValidator from "App/Validators/AddSliderValidator";
import UpdateSliderDataValidator from "App/Validators/UpdateSliderDataValidator";
import UpdateSliderImageValidator from "App/Validators/UpdateSliderImageValidator";
import cloudinary from "Config/cloudinary";

export default class SlidersController {
  async addImage(ctx: HttpContextContract) {
    const { request, response } = ctx;
    await request.validate(new AddSliderValidator(ctx));

    const {order,sliderSeo} = request.body();

    const webImage = request.file("webImage");
    const mobileImage = request.file("mobileImage");

    try {
      const uploadWebImage = await cloudinary.uploader.upload(
        webImage?.tmpPath ? webImage.tmpPath : "",
        {
          unique_filename: true,
          folder: "/slider/web",
        }
      );
      const uploadMobileImage = await cloudinary.uploader.upload(
        mobileImage?.tmpPath ? mobileImage.tmpPath : "",
        {
          unique_filename: true,
          folder: "/slider/mobile",
        }
      );
      const slider = await Slider.create({
        sliderSeo,
        sliderOrder:order,
        imageWebUrl: uploadWebImage.secure_url,
        imageWebFilePath: uploadWebImage.public_id,
        imageMobileFilePath: uploadMobileImage.public_id,
        imageMobileUrl: uploadMobileImage.secure_url
      });

      return response.created(
        new SliderCreatedResponse("Resim eklendi", {
          slider,
        })
      );
    } catch (err) {
      throw new FailedUploadSliderImageException();
    }
  }

  async updateWebImage(ctx: HttpContextContract) {
    const { request, response } = ctx;

    await request.validate(new UpdateSliderImageValidator(ctx));

    const { id } = request.body();
    const image = request.file("image");

    const findImage = await Slider.findBy("id", id);

    if (!findImage) {
      throw new NotfoundimageException("Slider bulunamadı.", 404);
    }

    try {
      const uploadImage = await cloudinary.uploader.upload(
        image?.tmpPath ? image.tmpPath : "",
        {
          public_id: findImage.imageWebFilePath,
        }
      );

      findImage.imageWebUrl = uploadImage.secure_url;
      findImage.imageWebFilePath = uploadImage.public_id;

      return response.created(
        new UpdateSliderImageResponse("Slider web resmi güncellendi", {})
      );
    } catch (err) {
      throw new FailedUploadSliderImageException();
    }
  }

  async updateSlider(ctx:HttpContextContract) {
    const { request, response } = ctx;

    await request.validate(new UpdateSliderDataValidator(ctx));

    const { order,sliderSeo,id } = request.body();

    const findImage = await Slider.findBy("id", id);

    if (!findImage) {
      throw new NotfoundimageException("Slider bulunamadı.", 404);
    }

    findImage.sliderOrder = order;
    findImage.sliderSeo = sliderSeo;

    await findImage.save();

    return response.ok({
      message:"Slider güncellendi"
    })
  }

  async uploadMobileImage(ctx:HttpContextContract) {
    const { request, response } = ctx;

    await request.validate(new UpdateSliderImageValidator(ctx));

    const { id } = request.body();
    const image = request.file("image");

    const findImage = await Slider.findBy("id", id);

    if (!findImage) {
      throw new NotfoundimageException("Slider bulunamadı.", 404);
    }

    try {
      const uploadImage = await cloudinary.uploader.upload(
        image?.tmpPath ? image.tmpPath : "",
        {
          public_id: findImage.imageMobileFilePath,
        }
      );

      findImage.imageMobileUrl = uploadImage.secure_url;
      findImage.imageMobileFilePath = uploadImage.public_id;

      return response.created(
        new UpdateSliderImageResponse("Slider mobil resim güncellendi", {})
      );
    } catch (err) {
      throw new FailedUploadSliderImageException();
    }
  }

  async getAllSliderImages(ctx: HttpContextContract) {
    const { response } = ctx;

    const sliders = await Slider.all();

    return response.ok(sliders);
  }

  // async deleteImage(ctx: HttpContextContract) {
  //   const { request, response } = ctx;

  //   const { id } = request.qs();

  //   const findImage = await Slider.findBy("id", id);

  //   if (!findImage) {
  //     throw new NotfoundimageException("Resim bulunamadı", 404);
  //   }

  //   try {
  //     await cloudinary.uploader.destroy(findImage.file_path);

  //     findImage.delete();

  //     return response.created(
  //       new UpdateSliderImageResponse("Resim silindi", {})
  //     );
  //   } catch (err) {
  //     throw new FailedDeleteSliderImageException();
  //   }
  // }
}
