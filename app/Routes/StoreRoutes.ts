import Route from '@ioc:Adonis/Core/Route';


Route.group(() => {
    Route.post('/create','StoresController.addStore').middleware(['auth','admin'])
    Route.put('/update','StoresController.updateStore').middleware(['auth','admin'])
    Route.get('/getAll','StoresController.getAllStores');
    Route.delete('/delete','StoresController.deleteStore').middleware(['auth','admin'])

}).prefix('/store')