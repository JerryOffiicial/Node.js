export const createUserValidationSchema = {
  user_name: {
    notEmpty: {
      errorMessage: "User Name must not be empty",
    },
    isLength: {
      options: { min: 3, max: 12 },
      errorMessage: "User Name length must be b/w 3 and 12 chars",
    },
    isString: {
      errorMessage: "User Name must be a string",
    },
  },

  age: {
    notEmpty: {
      errorMessage: "Age must not be empty",
    },
  },
};

export const createProductValidationSchema = {
  product_name: {
    notEmpty: {
      errorMessage: "Product name must not be empty.",
    },
    isLength: {
      options: { min: 3, max: 15 },
      errorMessage: "Product Name length must be b/w 3 and 15 chars",
    },
  },

  brand: {
    notEmpty: {
      errorMessage: "brand must be not empty",
    },
  },
};

export const createOrderValidationSchema = {
  product: {
    notEmpty: {
      errorMessage: "Product name must not be empty.",
    },
    isLength: {
      options: { min: 3, max: 15 },
      errorMessage: "Product Name length must be b/w 3 and 15 chars",
    },
  },

  date: {
    notEmpty: {
      errorMessage: "date must be not empty",
    },
  },
};
