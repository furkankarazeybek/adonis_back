import Category from "App/Models/Category";



export default class CategoryCreate {

    message:string;
    data:Category;

    constructor(msg:string,data:Category) {
        this.message = msg;
        this.data = data;
    }

}