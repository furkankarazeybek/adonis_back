import Env from '@ioc:Adonis/Core/Env';
import {v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  api_key:"498352353712861",
  api_secret:"e4Fem-s91tmw7SjYoZenHl8zXnY",
  cloud_name:"dfxvafgzg",
  secure:true
})
export default cloudinary;