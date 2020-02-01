import plaid from 'plaid'
import moment from 'moment'
import { RequestHandler } from 'express'

var PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID
var PLAID_SECRET = process.env.PLAID_SECRET
var PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY
var PLAID_ENV = process.env.PLAID_ENV;

var ACCESS_TOKEN : string;

// Initialize the Plaid client
var client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV]
)

export const receivePublicToken: RequestHandler = (req, res) => {
  const { public_token } = req.body;

  client.exchangePublicToken(public_token, (error, { access_token, item_id }) => {
    if (error) return res.status(500).json(error)

    ACCESS_TOKEN = access_token
    return res.json({
      access_token,
      item_id,
    })
  })
};

export const getTransactions: RequestHandler = (req, res) => {
  const startDate = moment().subtract(30, "days").format("YYYY-MM-DD")
  const endDate = moment().format("YYYY-MM-DD")
  
  client.getTransactions(
    ACCESS_TOKEN,
    startDate,
    endDate,
    {
      count: 250,
      offset: 0
    },
    function(error, transactionsResponse) {
      res.json({ transactions: transactionsResponse });
    }
  )
};