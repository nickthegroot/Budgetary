import express from 'express'
import { body } from 'express-validator';
import validate from './utils/validate';
import jwtCheck from './utils/auth';
import { receivePublicToken, getTransactions } from './controllers/plaid_controller';

const app = express();
const PORT = process.env.PORT ?? 4090

app.use(express.json())
app.use(jwtCheck)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

app.post('/plaid/public_token', validate([body('public_token').isString()]), receivePublicToken)
app.get('/transactions', validate([body('access_token').isString()]), getTransactions)

app.use((err, req, res, next) => {
    switch (err.name) {
        case 'UnauthorizedError':
            return res.status(401).send('Authorization is required.');
        default:
            console.error(err.stack)
            return res.status(500).send(err.name)
    }
})