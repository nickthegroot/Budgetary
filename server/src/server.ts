import HABIT_WEIGHTS from './utils/habit_weights'
import express from 'express'
import cors from 'cors'
import plaid from 'plaid'
import moment from 'moment'
import { body } from 'express-validator';
import validate from './utils/validate';
import jwtCheck from './utils/auth';
import { MongoClient, Collection } from 'mongodb'

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
let usersDb: Collection

const getPlaidAccessToken = async (user_id: string) => {
    const { plaidToken: access_token } = await usersDb.findOne({ id: user_id })
    return access_token
}

app.use(express.json())
app.use(cors())
app.use(jwtCheck)
app.listen(PORT, () => {
    MongoClient.connect(MONGODB_URI, (err, client) => {
        if (err) throw err;
        mongoClient = client;
        usersDb = client.db('hacksc').collection('users')
        console.log(`Connected to database ${MONGODB_URI}`)
    })
    console.log(`Server running on port ${PORT}`)
})

app.post('/plaid/public_token', validate([body('public_token').isString()]), async (req: any, res) => {
    const { public_token } = req.body;
    const { access_token } = await plaidClient.exchangePublicToken(public_token)
    usersDb.insertOne({ id: req.user.sub, plaidToken: access_token })
    return res.sendStatus(200)
})

app.post('/budget/recommend', validate([body('goal').isNumeric()]), async (req: any, res) => {
    const { goal } = req.body;
    const plaidToken = await getPlaidAccessToken(req.user.sub)
    const lastMonthStart = moment().startOf('month').subtract(1, 'month')
    const lastMonthEnd = moment().startOf('month').subtract(1, 'day')

    const transactions = await plaidClient.getTransactions(plaidToken, lastMonthStart.format('YYYY-MM-DD'), lastMonthEnd.format('YYYY-MM-DD'))
    const spending_habits: {[habit: string]: { amount: number, percent: number }} = {}
    for (let transaction of transactions.transactions) {
        spending_habits[transaction.category[0]] = {
            percent: 0,
            amount: (spending_habits[transaction.category[0]]?.amount ?? 0) + transaction.amount,
        }
    }

    
    let total_spending = 0
    for (let habit in spending_habits) {
        total_spending += spending_habits[habit].amount
    }
    
    for (let habit in spending_habits) {
        spending_habits[habit].percent = spending_habits[habit].amount / total_spending
    }
    
    let unaccounted: number = goal;
    let monthly_budget = { Goal: goal }
    let updated_habit_weights = {...HABIT_WEIGHTS}
    while (unaccounted > 0) {
        let totalWeights = 0
        for (let habit in updated_habit_weights) {
            if (monthly_budget[habit] < 0.1 || spending_habits[habit] === undefined) {
                // We've run out of money to take from the category. Adjust the weights.
                updated_habit_weights[habit] = 0
                monthly_budget[habit] = 0
            }
            totalWeights += updated_habit_weights[habit] 
        }

        // We've exausted all categories we can take money out of. The budget is impossible.
        if (totalWeights === 0) return res.sendStatus(400)

        for (let habit in updated_habit_weights) {
            updated_habit_weights[habit] = updated_habit_weights[habit] / totalWeights
        }

        let accounted_pass = 0
        for (let habit in spending_habits) {
            let budgetSave = updated_habit_weights[habit] * unaccounted
            let budget: number;
            if (spending_habits[habit].amount > (budgetSave + (monthly_budget[habit] ?? 0))) {
                budget = spending_habits[habit].amount - budgetSave
            } else {
                budgetSave = spending_habits[habit].amount
                budget = 0
            }

            monthly_budget[habit] = (monthly_budget[habit] ?? 0) + parseFloat(budget.toFixed(2))
            accounted_pass += budgetSave
        }

        unaccounted -= accounted_pass
    }

    res.json(monthly_budget)
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
