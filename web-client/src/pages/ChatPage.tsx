import React, { FC } from 'react'
import PlaidLink from 'react-plaid-link'
import { useServer } from '../hooks/server'

const PLAID_ENV = process.env.REACT_APP_PLAID_ENV!
const PLAID_PUBLIC_KEY = process.env.REACT_APP_PLAID_PUBLIC_KEY!

const ChatPage: FC = () => {
    const { savePlaidToken, getBudgetRecommendations } = useServer();
    const handlePlaidSuccess = (publicToken: string) => savePlaidToken(publicToken);

    return (
        <div>
            <PlaidLink
                clientName="HackSC"
                env={PLAID_ENV as any}
                product={["auth", "transactions"]}
                publicKey={PLAID_PUBLIC_KEY}
                onSuccess={handlePlaidSuccess}
                onExit={() => undefined}
            >
                Connect Your Bank
            </PlaidLink>
            <button onClick={() => getBudgetRecommendations(28000)}>Get Budget Recommendation</button>
        </div>
    )
}


export default ChatPage;
