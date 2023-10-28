import Route from '@ioc:Adonis/Core/Route';


Route.group(() => {

    Route.post('/add','ProductCategoriesController.addCategory').middleware(['auth','admin']);
    Route.put('/update','ProductCategoriesController.updateCategory').middleware(['auth','admin']);
    Route.get('/all','ProductCategoriesController.getAllCategories')
    Route.delete('/delete','ProductCategoriesController.deleteCategory').middleware(['auth','admin']);

}).prefix('/category')