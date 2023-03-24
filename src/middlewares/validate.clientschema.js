export function validateSchema(schema) {
    return async function validar(req, res, next) {
      const validation = schema.validate(req.body, { abortEarly: false });

      const {phone} =  validation.value

      if(phone.length >11 || phone.length < 10) return res.sendStatus(400)
  
      if (validation.error) {
          return res.status(400).send(validation.error.details);
      }
  
      next();
    };
  }