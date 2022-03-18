const jwt = require('jsonwebtoken');
const dotenv    = require("dotenv");
dotenv.config();
// const secret =  process.env.SECRET_TOKEN;
const secret    = 'RANDOM_TOKEN_SECRET';

module.exports= {
  
    validateToken: (request, response, next) => {
        const token  = request.headers.authorization.split('Bearer-')[1];
        let result;
        if (token) {
          try {
            // verify makes sure that the token hasn't expired and has been issued by us
            result = jwt.verify(token, secret);
    
            // Let's pass back the decoded token to the request object
            request.decoded = result;
            // We call next to pass execution to the subsequent middleware
            next();
          } catch (err) {
            // Throw an error just in case anything goes wrong with verification
            console.log(err)
            response.send(err)
          }
        } else {
          result = { 
            error: `Authentication error. Token required.`,
            status: 401
          };
          console.log(result)
          response.status(401).send(result);
        }
    }

}