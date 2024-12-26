import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import validationMiddlewares from "./src/middlewares/validation.middlewares.js";

const server = express();

//parse form data so that we can see it inside req body
server.use(express.urlencoded({ extended: true }));

//setup view engine settings
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts); // we will use this layout for our views

//create instance of ProductController
const productController = new ProductController();
server.get("/", productController.getProducts);
server.get("/new", productController.getAddForm);
server.get("/update-product/:id", productController.getUpdateProductView); //id is URL parameter
server.post("/", validationMiddlewares, productController.addNewProduct);
server.post("/update-product", productController.postUpdateProduct);

server.use(express.static("src/views"));

server.listen(3400);
console.log("Server is listening on port 3400");
