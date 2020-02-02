import React, { FC } from 'react'
import PlaidLink from 'react-plaid-link'
import { useServer } from '../hooks/server'
import styled from 'styled-components'
import ChatBubble from '../components/Bubble/ChatBubble'

const PLAID_ENV = process.env.REACT_APP_PLAID_ENV!
const PLAID_PUBLIC_KEY = process.env.REACT_APP_PLAID_PUBLIC_KEY!

const Header = styled.div({
    border: '1px solid black',
    height: 50,
    width: '100%',
    flex: 1,
    display: 'flex',
})

const ChatPage: FC = () => {
    const { savePlaidToken, getBudgetRecommendations } = useServer();
    const handlePlaidSuccess = (publicToken: string) => savePlaidToken(publicToken);

    return (
        <div style={{ minHeight: '100vh', minWidth: '100vw' }}>
            <Header>
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
            </Header>
            <div style={{ padding: 15 }}>

                <ChatBubble>Hello! My name is Dave.</ChatBubble>
                <ChatBubble user>Hello! My name is Dave.</ChatBubble>
                <ChatBubble user>Hello! My name is Dave.</ChatBubble>
                <ChatBubble>Hello! My name is Dave.</ChatBubble>

            </div>
        </div>
    )
}


export default ChatPage;
