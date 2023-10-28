import Database from '@ioc:Adonis/Lucid/Database';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category';
import ProductCategoryAddValidator from 'App/Validators/ProductCategoryAddValidator';
import CategoryCreate from 'App/Core/Utilities/Response/CategoryCreatedResponse';
import UpdateCategoryValidator from 'App/Validators/UpdateCategoryValidator';
import ErrorResponse from 'App/Core/Utilities/Errors/ErrorResponse';
import UpdateCategoryResponse from 'App/Core/Utilities/Response/UpdateCategoryResponse';
import GetAllCategories from 'App/Core/Utilities/Response/GetAllCategories';
import DeleteCategoryValidator from 'App/Validators/DeleteCategoryValidator';
import NotFoundCategoryException from 'App/Exceptions/NotFoundCategoryException';

export default class ProductCategoriesController {


    async getAllCategories(ctx:HttpContextContract) {


        const {response} = ctx;

        const categories = await Category.all();

        return response.ok(categories);
    } 


    async addCategory(ctx:HttpContextContract) {

        const {request,response} = ctx;

        await request.validate(new ProductCategoryAddValidator(ctx));
        
        
        const {categoryName} = request.body();

        await Database.transaction(async(trx) => {
            const category = await Category.create({
                name:categoryName
            })

            await category.useTransaction(trx);

            return response.created(new CategoryCreate("Başarılı bir şekilde oluşturuldu",category));
        })
    }


    async updateCategory(ctx:HttpContextContract) {

        const {request,response} = ctx;


        await request.validate(new UpdateCategoryValidator(ctx));



        const {id,categoryName} = request.body();

        const category = await Category.findBy('id',id);

        if(!category) {
            return response.notFound(new ErrorResponse('Kategori bulunamadı',"404"));
        }

        category.name = await categoryName;
        await category.save();
        return response.ok(new UpdateCategoryResponse("Başarılı bir şekilde güncellendi",category))
    }

    async deleteCategory(ctx:HttpContextContract) {

        const {request,response} = ctx;

        await request.validate(new DeleteCategoryValidator(ctx));

        const {categoryId} = request.qs();

        const findCategory = await Category.findBy('id',categoryId);

        if(!findCategory) {
            throw new NotFoundCategoryException();
        }

        findCategory.delete();

        return response.ok({
            message:'Başarılı! Kategori kaldırıldı',
            status:true
        })

    }


}
