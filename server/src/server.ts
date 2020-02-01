import express from 'express'
import cors from 'cors'
import plaid from 'plaid'
import moment from 'moment'
import { body } from 'express-validator';
import validate from './utils/validate';
import jwtCheck from './utils/auth';
import { MongoClient, Db } from 'mongodb'

const app = express();
const PORT = process.env.PORT ?? 4090
const MONGODB_URI = process.env.MONGODB_URI

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID
const PLAID_SECRET = process.env.PLAID_SECRET
const PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY
const PLAID_ENV = process.env.PLAID_ENV;
const plaidClient = new plaid.Client(
    PLAID_CLIENT_ID,
    PLAID_SECRET,
    PLAID_PUBLIC_KEY,
    plaid.environments[PLAID_ENV]
  )

let mongoClient: MongoClient
let db: Db

app.use(express.json())
app.use(cors())
app.use(jwtCheck)
app.listen(PORT, () => {
    MongoClient.connect(MONGODB_URI, (err, client) => {
        if (err) throw err;
        mongoClient = client;
        db = client.db('hacksc')
        console.log(`Connected to database ${MONGODB_URI}`)
    })
    console.log(`Server running on port ${PORT}`)
})

app.post('/plaid/public_token', validate([body('public_token').isString()]), (req: any, res) => {
    const { public_token } = req.body;

    plaidClient.exchangePublicToken(public_token, (error, { access_token }) => {
        if (error) return res.status(500).json(error)

        db.collection('users').insertOne({ id: req.user.sub, plaidToken: access_token })
        return res.sendStatus(200)
    })
})

app.use((err, req, res, next) => {
    switch (err.name) {
        case 'UnauthorizedError':
            return res.sendStatus(401);
        default:
            console.error(err.stack)
            return res.status(500).send(err.name)
    }
})
