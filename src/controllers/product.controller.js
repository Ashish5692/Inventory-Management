import path from "path";
import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProducts(req, res) {

    let products = ProductModel.get()
    console.log(products);

    //specify name of your template and don't specify complete path as we have specified that in our index.js 
    //then in data specify products , use same key inside products.ejs also
    res.render("products", {products: products})

    // return res.sendFile(
    //   path.join(path.resolve(), "src", "views", "products.html")
    // );
  }
}
