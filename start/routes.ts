import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  require("App/Routes/SliderRoutes");
  require("App/Routes/AboutRoutes");
  require("App/Routes/AuthRoutes");
  require("App/Routes/CategoryRoutes");
  require("App/Routes/ContactRoutes");
  require("App/Routes/StoreRoutes");
  require("App/Routes/LogisticRoutes");
  require("App/Routes/ExchangeRoutes");



  Route.get("/", () => {
    return "Hello Encin Backend!";
  });
}).prefix("/api/v1");
