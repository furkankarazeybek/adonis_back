import Application from "@ioc:Adonis/Core/Application";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { AboutUpdateResponse } from "App/Core/Utilities/Response/AboutUpdateResponse";
import About from "App/Models/About";
import UpdateAboutValidator from "App/Validators/UpdateAboutValidator";

export default class AboutsController {
  async updateAbout(ctx: HttpContextContract) {
    const { request, response } = ctx;

    await request.validate(new UpdateAboutValidator(ctx));

    const { header, content, id } = request.body();
    const video = request.file("video_file");

    const savePath = `${process.env.TMP_PATH}/about`;
    const saveVideosPath = `${savePath}`;

    const videoName = `${Date.now()}.${video?.extname}`;

    if (!id) {
      const about = await About.create({
        content,
        header,
        video_file: `${saveVideosPath}/${videoName}`,
      });
      await video?.move(Application.tmpPath(savePath), {
        overwrite: true,
        name: videoName,
      });
      return response.ok(
        new AboutUpdateResponse("Bölüm eklendi", about.toJSON())
      );
    }

    const findAbout = await About.findBy('id',id);

    if(!findAbout) {
      return response.notFound({
        msg:'Bulunamadı',
      })
    }

    const fileName = findAbout.video_file.split('/')[3];

    await video?.move(Application.tmpPath(savePath), {
      overwrite: true,
      name: fileName,
    });
    return response.ok(
      new AboutUpdateResponse("Bölüm güncellendi", findAbout.toJSON())
    );

  }
}
