import Route from '@ioc:Adonis/Core/Route';


Route.group(() => {
    Route.get('/exchange','ExchangesController.getAllExchangeData');
}).prefix('/exchange')