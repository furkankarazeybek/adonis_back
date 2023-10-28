import Hash from "@ioc:Adonis/Core/Hash"
import IncorretPasswordException from "App/Exceptions/IncorretPasswordException";


export const passwordControl = async(password,HashPassword) => {
    const verify = await Hash.verify(HashPassword,password);
    if(!verify) {
        throw new IncorretPasswordException("Şifre hatalı!",400);
    }
}