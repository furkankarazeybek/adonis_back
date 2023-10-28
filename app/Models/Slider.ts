import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Slider extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public sliderOrder: number;

  @column()
  public sliderSeo: string;

  @column()
  public imageWebUrl: string;

  @column({serializeAs:null})
  public imageWebFilePath: string;

  @column()
  public imageMobileUrl: string;

  @column({serializeAs:null})
  public imageMobileFilePath: string;

  @column.dateTime({ autoCreate: true,serializeAs:null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true,serializeAs:null })
  public updatedAt: DateTime;
}
