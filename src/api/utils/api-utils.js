

export const validateRequest =
  (schema) => (req, res, next) => {
    console.log("Request body ===============",req.body);

    const { error } = schema.validate(
      req?.body ? req.body : req?.params ? req.params : req.query
    );

    if (error) {
      return res.status(400).json({
        success: false,
        error:  error.details[0].message,
      });
    }

    return next();
  };

