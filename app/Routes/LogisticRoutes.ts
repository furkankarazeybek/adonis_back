import Route from '@ioc:Adonis/Core/Route';


Route.group(() => {
    Route.post('/create','LogisticsController.addLogistic').middleware(['auth','admin'])
    Route.get('/all','LogisticsController.getAll');
    Route.delete('/delete','LogisticsController.deleteLogistic').middleware(['auth','admin'])

}).prefix('/logistic')