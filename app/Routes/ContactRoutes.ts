import Route from '@ioc:Adonis/Core/Route';


Route.group(() => {
    Route.post('/add','ContactsController.addContact');
}).prefix('/contact')