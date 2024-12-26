import path from "path";
import ProductModel from "../models/product.model.js";
import { error } from "console";

export default class ProductController {
  getProducts(req, res) {
    let products = ProductModel.get();
    console.log(products);

    //specify name of your template and don't specify complete path as we have specified that in our index.js
    //then in data specify products , use same key inside products.ejs also
    res.render("products", { products: products });

    // return res.sendFile(
    //   path.join(path.resolve(), "src", "views", "products.html")
    // );
  }

  getAddForm(req, res, next) {
    res.render("new-product", { errorMessage: null });
  }

  addNewProduct(req, res, next) {
    //access data from form
    //console.log(req.body);
    ProductModel.add(req.body);
    let products = ProductModel.get();
    res.render("products", { products: products }); //send user back to product page after adding new product
  }

  getUpdateProductView(req, res, next) {
    //1. if product exist then return view
    const id =  req.params.id; ///can access url id parameters defined in index file(route)
    const productFound = ProductModel.getById(id);
    if (productFound) {
      res.render("update-product", {
        product: productFound,
        errorMessage: null,
      });
    }
    //2. else return errors
    else {
      res.status(401).send("Product not Found");
    }
  }

  postUpdateProduct(req, res) {
    ProductModel.update(req.body);
    let products = ProductModel.get();
    res.render("products", { products: products }); //send user back to product page after adding new product
  
  }
}
