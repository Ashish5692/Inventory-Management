import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import UserController from "./src/controllers/user.controller.js";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import validationMiddlewares from "./src/middlewares/validation.middlewares.js";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";

const server = express({});

server.use(express.static("public")); //so that our js file can be directly accessed in our views

//configuring session
server.use(session({
    secret: 'SecretKey', //use key generator in application
    resave: false,
    saveUninitialized:true,
    cookie: {secure: false}, // as now we have http 
}))

//parse form data so that we can see it inside req body
server.use(express.urlencoded({ extended: true }));

//setup view engine settings
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts); // we will use this layout for our views

//create instance of ProductController beacuse method need to call using instances
const productController = new ProductController();

const usersController = new UserController();

server.get('/register', usersController.getRegister);
server.get('/login', usersController.getLogin);
server.post('/login', usersController.postLogin);
server.get('/logout', usersController.logout);
server.post('/register', usersController.postRegister);
server.get("/",auth, productController.getProducts);
server.get("/new",auth, productController.getAddForm);
server.get("/update-product/:id",auth, productController.getUpdateProductView); //id is URL parameter
server.post(
  "/",
  uploadFile.single('imageUrl'), // telling that you will find file inside imageUrl field of form
  auth,
  validationMiddlewares,
  productController.addNewProduct
);
server.post("/update-product",auth, productController.postUpdateProduct);
server.post("/delete-product/:id",auth, productController.deleteProduct);

server.use(express.static("src/views"));

server.listen(3400);
console.log("Server is listening on port 3400");
