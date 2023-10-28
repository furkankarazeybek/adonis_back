import Route from '@ioc:Adonis/Core/Route';



Route.group(() => {

    Route.post('/add-image','SlidersController.addImage').middleware(['auth','admin'])
    Route.put('/update-web','SlidersController.updateWebImage').middleware(['auth','admin'])
    Route.put('/update-mobile','SlidersController.uploadMobileImage').middleware(['auth','admin'])

    Route.put('/update-data','SlidersController.updateSlider').middleware(['auth','admin'])

    Route.delete('/delete','SlidersController.deleteImage').middleware(['auth','admin'])
    Route.get('/all-images','SlidersController.getAllSliderImages');
    



}).prefix('/slider')
