import Route from '@ioc:Adonis/Core/Route';



Route.group(() => {

    Route.post('/signup','AuthController.signup');
    Route.post('/login','AuthController.signin');
    Route.get('/logout','AuthController.logout').middleware('auth')
    Route.get('/checkToken','AuthController.checkToken').middleware('auth')


}).prefix('/auth');