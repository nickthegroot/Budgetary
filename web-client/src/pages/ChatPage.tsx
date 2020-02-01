import React, { FC } from 'react'
import PlaidLink from 'react-plaid-link'

const PLAID_ENV = process.env.REACT_APP_PLAID_ENV!
const PLAID_PUBLIC_KEY = process.env.REACT_APP_PLAID_PUBLIC_KEY!

const ChatPage: FC = () => {
    return (
        <PlaidLink
            clientName="HackSC"
            env={PLAID_ENV as any}
            product={["auth", "transactions"]}
            publicKey={PLAID_PUBLIC_KEY}
            onExit={() => undefined}
            onSuccess={() => undefined}>
            Connect Your Bank
    </PlaidLink>
    )
}


export default ChatPage;
