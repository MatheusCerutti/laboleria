export function validateSchema(schema) {
    return async function validar(req, res, next) {
      const validation = schema.validate(req.body, { abortEarly: false });

      const {quantity} = validation.value

      if(quantity > 5 || quantity < 1) return res.sendStatus(400)
  
      if (validation.error) {
          return res.status(400).send(validation.error.details);
      }
  
      next();
    };
  }