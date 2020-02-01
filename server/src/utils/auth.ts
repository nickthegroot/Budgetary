import jwt from 'express-jwt'
import jwks from 'jwks-rsa'

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://hacksc20-budget.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://hacksc.com',
  issuer: 'https://hacksc20-budget.auth0.com/',
  algorithms: ['RS256']
});

export default jwtCheck