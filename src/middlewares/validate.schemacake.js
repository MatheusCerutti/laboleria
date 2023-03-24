export function validateSchema(schema) {
    return async function validar(req, res, next) {
      const validation = schema.validate(req.body, { abortEarly: false });

      const {name,price,description} = validation.value
      
      if(!name || name.length < 2) return res.sendStatus(400);

      if(price <= 0) return res.sendStatus(400);

      if (typeof description !== 'string') {
        return res.sendStatus(400);
      }
  
      if (validation.error) {
        console.log(validation)
          return res.status(422).send(validation.error.details);
      }
  
      next();
    };
  }