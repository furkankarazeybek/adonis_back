import Route from '@ioc:Adonis/Core/Route';



Route.group(() => {
    Route.put('/update','AboutsController.updateAbout');
}).prefix('/about')