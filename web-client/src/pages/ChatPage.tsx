import React, { FC } from 'react'
import PlaidLink from 'react-plaid-link'
import axios from 'axios'

const PLAID_ENV = process.env.REACT_APP_PLAID_ENV!
const PLAID_PUBLIC_KEY = process.env.REACT_APP_PLAID_PUBLIC_KEY!

const ChatPage: FC = () => {
    const handleExit = () => {}
    const handleSuccess = async (token: string, metadata: any) => {
        const { access_token, item_id }: { access_token: string, item_id: string }
            = await axios.post('http://localhost:4090/plaid/public_token', { public_token: token })
        
        const transactions = await axios.get('http://localhost:4090/transactions')
        console.log(transactions)
    }

    return (
        <PlaidLink
            clientName="HackSC"
            env={PLAID_ENV as any}
            product={["auth", "transactions"]}
            publicKey={PLAID_PUBLIC_KEY}
            onExit={handleExit}
            onSuccess={handleSuccess}>
            Connect Your Bank
      </PlaidLink>
    )
}

export default ChatPage