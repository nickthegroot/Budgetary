import React, { FC } from 'react'
import PlaidLink from 'react-plaid-link'
import axios from 'axios'
import { Consumer } from '../context/auth'

const PLAID_ENV = process.env.REACT_APP_PLAID_ENV!
const PLAID_PUBLIC_KEY = process.env.REACT_APP_PLAID_PUBLIC_KEY!

interface Props {
    serverAccessToken: string;
}

const ChatPage: FC<Props> = ({ serverAccessToken }) => {
    const axiosConfig = { headers: { Authorization: `Bearer ${serverAccessToken}` }}
    const handleExit = () => {}
    const handleSuccess = async (token: string, metadata: any) => {
        await axios.post('http://localhost:4090/plaid/public_token', { public_token: token }, axiosConfig)
        const transactions = await axios.get('http://localhost:4090/transactions', axiosConfig)
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


export default () => (
    <Consumer select={[ state => state.accessToken ]}>
        {(accessToken: string) => (
        <ChatPage serverAccessToken={accessToken} />
        )}
    </Consumer>
)