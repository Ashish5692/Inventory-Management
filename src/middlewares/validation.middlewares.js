//Export default works with either of 3 things.. HoistedDeclaration => a function
// Class
// assignment expression

import { body, validationResult } from "express-validator";

const validateRequest = async(req, res, next) => {
  //USING EXPRESS-VALIDATOR
  //1. Setup rules for validation- creating rules on individual field of product data which we are recieving in request body
  const rules = [
    body("name").notEmpty().withMessage("Name is Required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be a positive value"),
    body("imageUrl").isURL().withMessage("Invalid url"),
  ];

  // 2. Run these validation rules - runing these rules can be async operation (i/o operation) so use promises to run these rules
  await Promise.all(rules.map(rule => rule.run(req)));

  // 3. check if there are any errors after running the rules .
  var validationErrors = validationResult(req);

  // 4. if errors, return the error message
  if(!validationErrors.isEmpty()) {
    return res.render("new-product", {
        errorMessage: validationErrors.array()[0].msg,
      });
    }
    next();
  };

  //validate data
  //   const { name, price, imageUrl } = req.body;
  //   let errors = [];
  //   if (!name || name.trim() == "") {
  //     errors.push("Name is required");
  //   }
  //   if (!price || parseFloat(price) < 1) {
  //     errors.push("Price must be a positive value");
  //   }

  //   try {
  //     const validUrl = new URL(imageUrl);
  //   } catch (err) {
  //     errors.push("URL is invalid");
  //   }

  //sending error to client
//   if (errors.length > 0) {
//     return res.render("new-product", {
//       errorMessage: errors[0],
//     });
//   }
//   next();
// };

export default validateRequest;
