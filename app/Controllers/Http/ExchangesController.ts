import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
const axios = require("axios");
const cheerio = require("cheerio");



interface BanItemType {
  urun_adi: string;
  birim: string;
  son_islem_tarihi: string;
  en_az: string;
  en_cok: string;
  ortalama: string;
  islem_miktari: string;
  islem_adedi: string;
  islem_tutari: string;
}

interface UzunKopruItemType {
  urun_adi: string,
  birim: string,
  son_islem_tarihi: string,
  en_az: string,
  en_cok: string,
  ortalama: string,
  islem_miktari: string,
  islem_adedi: string,
  islem_tutari: string,
}

interface EdirneItemType {
  urun_adi: string;
  birim: string;
  son_islem_tarihi: string;
  en_az: string;
  en_cok: string;
  ortalama: string;
  islem_miktari: string;
  islem_adedi: string;
  islem_tutari: string;
}

interface PolatliItemType {
  urun_adi: string;
  min_fiyat: string;
  max_fiyat: string;
  ortalama_fiyat: string;
  miktar: string;
  islem_tutari: string;
  islem_adedi: string;
}

interface KonyaItemType {
  urun_adi: string;
  birim: string;
  son_islem_tarihi: string;
  en_az: string;
  en_cok: string;
  ortalama: string;
  islem_miktari: string;
  islem_adedi: string;
  islem_tutari: string;
}

export default class ExchangesController {
  async getBandirmaExchange() {

    let currencies: BanItemType[] = [];
    try {
      let resp = await axios({
        url: "https://borsa.tobb.org.tr/fiyat_borsa.php?borsakod=5BA20",
        method: "GET",
      });

      if (resp.status == 200) {
        let $ = cheerio.load(resp.data);

        for (let k = 2; k < 30; k++) {
          let r1 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(1) > a > font`
          ).text();

          let r2 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(2) > font`
          ).text();

          let r3 = $(
            $(
              `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(3) > font`
            )
          ).text();

          let r4 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(4) > font`
          ).text();

          let r5 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(5) > font`
          ).text();

          let r6 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(6) > font`
          ).text();

          let r7 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(7) > font`
          ).text();

          let r8 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(8) > font`
          ).text();

          let r9 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(9) > font`
          ).text();

          let item : BanItemType = {
            urun_adi: r1,
            birim: r2,
            son_islem_tarihi: r3,
            en_az: r4,
            en_cok: r5,
            ortalama: r6,
            islem_miktari: r7,
            islem_adedi: r8,
            islem_tutari: r9,
          };

          const date = new Date();

          let day = date.getDate(); //30

          let month = date.getMonth() + 1;   //10

          const year = date.getFullYear(); //  2023

          const tarih = `${day < 10 ? "0" : ""}${day}.${month < 10 ? "0" : ""}${month}.${year}`;

          const urunTarih = r3.slice(0, 10);

          if (r1.length > 1 && urunTarih === tarih) { 

            currencies.push(item);




          }



        }
      }
    } catch {}

    return currencies;
  }

  async getEdirneExchange() {
    let currencies: EdirneItemType[] = [];

    try {
      let resp = await axios({
        url: "https://borsa.tobb.org.tr/fiyat_borsa.php?borsakod=5ED10",
        method: "GET",
      });

      if (resp.status == 200) {
        let $ = cheerio.load(resp.data);

        for (let k = 2; k < 30; k++) {
          let r1 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(1) > a > font`
          ).text();

          let r2 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(2) > font`
          ).text();

          let r3 = $(
            $(
              `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(3) > font`
            )
          ).text();

          let r4 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(4) > font`
          ).text();

          let r5 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(5) > font`
          ).text();

          let r6 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(6) > font`
          ).text();

          let r7 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(7) > font`
          ).text();

          let r8 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(8) > font`
          ).text();

          let r9 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(9) > font`
          ).text();

          let item: EdirneItemType = {
            urun_adi: r1,
            birim: r2,
            son_islem_tarihi: r3,
            en_az: r4,
            en_cok: r5,
            ortalama: r6,
            islem_miktari: r7,
            islem_adedi: r8,
            islem_tutari: r9,
          };
          const date = new Date();

          let day = date.getDate(); //30

          let month = date.getMonth() + 1;   //10

          const year = date.getFullYear(); //  2023

          const tarih = `${day < 10 ? "0" : ""}${day}.${month < 10 ? "0" : ""}${month}.${year}`;

          const urunTarih = r3.slice(0, 10);

          if (r1.length > 1 && urunTarih === tarih) { 

            currencies.push(item);




          }
        }
      }
    } catch {}
    return currencies;
  }

  async getPolatliExchange() {
    let currencies: PolatliItemType[] = [];
    try {
      let resp = await axios({
        url: "https://www.polatliborsa.org.tr/satis-salonu-bulteni/",
        method: "GET",
      });

      if (resp.status == 200) {
        let $ = cheerio.load(resp.data);

        for (let k = 1; k < 30; k++) {
          let r1 = $(
            `.table_green > tbody > tr:nth-child(${k}) > td:nth-child(1) > b`
          ).text();

          let r2 = $(
            `.table_green > tbody > tr:nth-child(${k}) > td:nth-child(2)`
          ).text();

          let r3 = $(
            `.table_green > tbody > tr:nth-child(${k}) > td:nth-child(3)`
          ).text();

          let r4 = $(
            `.table_green > tbody > tr:nth-child(${k}) > td:nth-child(4)`
          ).text();

          let r5 = $(
            `.table_green > tbody > tr:nth-child(${k}) > td:nth-child(5)`
          ).text();

          let r6 = $(
            `.table_green > tbody > tr:nth-child(${k}) > td:nth-child(6)`
          ).text();

          let r7 = $(
            `.table_green > tbody > tr:nth-child(${k}) > td:nth-child(7)`
          ).text();

          let item = {
            urun_adi: r1,
            min_fiyat: r2,
            max_fiyat: r3,
            ortalama_fiyat: r4,
            miktar: r5,
            islem_tutari: r6,
            islem_adedi: r7,
          };
          if (r1.length > 1) {
            currencies.push(item);
          }
        }
      }
    } catch {}

    return currencies;
  }

  async getAllUzunKopruExchange() {
    let currencies:UzunKopruItemType[] = [];

    try {
      let resp = await axios({
        url: "https://borsa.tobb.org.tr/fiyat_borsa.php?borsakod=5UZ10",
        method: "GET",
      });

      if (resp.status == 200) {
        let $ = cheerio.load(resp.data);

        for (let k = 2; k < 30; k++) {
          let r1 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(1) > a > font`
          ).text();

          let r2 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(2) > font`
          ).text();

          let r3 = $(
            $(
              `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(3) > font`
            )
          ).text();

          let r4 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(4) > font`
          ).text();

          let r5 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(5) > font`
          ).text();

          let r6 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(6) > font`
          ).text();

          let r7 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(7) > font`
          ).text();

          let r8 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(8) > font`
          ).text();

          let r9 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(9) > font`
          ).text();

          let item:UzunKopruItemType = {
            urun_adi: r1,
            birim: r2,
            son_islem_tarihi: r3,
            en_az: r4,
            en_cok: r5,
            ortalama: r6,
            islem_miktari: r7,
            islem_adedi: r8,
            islem_tutari: r9,
          };
          const date = new Date();

          let day = date.getDate(); //30

          let month = date.getMonth() + 1;   //10

          const year = date.getFullYear(); //  2023

          const tarih = `${day < 10 ? "0" : ""}${day}.${month < 10 ? "0" : ""}${month}.${year}`;

          const urunTarih = r3.slice(0, 10);

          if (r1.length > 1 && urunTarih === tarih) { 

            currencies.push(item);




          }
        }

        return currencies;
        /* fs.writeFileSync("resp.json",JSON.stringify(currencies,null,4),"UTF-8"); */
      } else {
        console.warn("RESP DOESNT SUCCESFUL", resp.status, resp.statusText);
      }
    } catch {
      return "error";
    }
  }

  async getAllKonyaIllgitBorsa() {
    let currencies: KonyaItemType[] = [];

    try {
      let resp = await axios({
        url: "https://borsa.tobb.org.tr/fiyat_borsa.php?borsakod=5IL10",
        method: "GET",
      });

      if (resp.status == 200) {
        let $ = cheerio.load(resp.data);

        //body > div > div > div.ıslem-ozet-tse.ilkdiv > table   //bugday_2 satildi
        for (let k = 2; k < 30; k++) {
          let r1 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(1) > a > font`
          ).text();

          let r2 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(2) > font`
          ).text();

          let r3 = $(
            $(
              `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(3) > font`
            )
          ).text();

          let r4 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(4) > font`
          ).text();

          let r5 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(5) > font`
          ).text();

          let r6 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(6) > font`
          ).text();

          let r7 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(7) > font`
          ).text();

          let r8 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(8) > font`
          ).text();

          let r9 = $(
            `body > center > table > tbody > tr:nth-child(2) > td > center > center> table > tbody > tr:nth-child(${k}) >  td:nth-child(9) > font`
          ).text();

          let item: KonyaItemType = {
            urun_adi: r1,
            birim: r2,
            son_islem_tarihi: r3,
            en_az: r4,
            en_cok: r5,
            ortalama: r6,
            islem_miktari: r7,
            islem_adedi: r8,
            islem_tutari: r9,
          };
          const date = new Date();

          let day = date.getDate(); //30

          let month = date.getMonth() + 1;   //10

          const year = date.getFullYear(); //  2023

          const tarih = `${day < 10 ? "0" : ""}${day}.${month < 10 ? "0" : ""}${month}.${year}`;

          const urunTarih = r3.slice(0, 10);

          if (r1.length > 1 && urunTarih === tarih) { 

            currencies.push(item);




          }
        }
      }
    } catch {}
    return currencies;
  }

  async getAllExchangeData({ response }: HttpContextContract) {
    const data = await Promise.all([
      this.getBandirmaExchange(),
      this.getEdirneExchange(),
      this.getPolatliExchange(),
      this.getAllKonyaIllgitBorsa(),
      this.getAllUzunKopruExchange(),
    ]);

    return response.ok({
      exchanges: {
        bandirma: data[0],
        edirne: data[1],
        polatli: data[2],
        ilgit: data[3],
        uzunKopru: data[4]
      },
    });
  }
}
