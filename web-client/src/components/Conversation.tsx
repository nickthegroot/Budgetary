import React, { FC, useState, useEffect } from 'react'
import PlaidLink from 'react-plaid-link'
import Flow from '../conversations'
import { useServer } from '../hooks/server'
import Bubble from './Bubble/ChatBubble'
import Button from './button'
import { ConversationMessage } from '../conversations/types'

const PLAID_ENV = process.env.REACT_APP_PLAID_ENV!
const PLAID_PUBLIC_KEY = process.env.REACT_APP_PLAID_PUBLIC_KEY!

const Conversation: FC = () => {
    const { savePlaidToken, getBudgetRecommendations } = useServer();
    const handlePlaidSuccess = (publicToken: string) => {
        savePlaidToken(publicToken)
        setNextMessage(113)
    }
    
    const [nextMessage, setNextMessage] = useState<number>(1)
    const [messages, setMessages] = useState<{message: React.ReactNode, user: boolean}[]>([])
    const [responses, setResponses] = useState<React.ReactNode[]>([])
    const [messageHistory, setMessageHistory] = useState<number[]>([])
    const [responseHistory, setResponseHistory] = useState<{ [ key: string ]: string | number }>({})
    const [budget, setBudget] = useState<Object>()
    
    // const addMessage = async (id = messageHistory[-1], prevMessages = messages, prevMessageHistory = messageHistory, user = false) => {
    const addMessage = async (id: number) => {
        const message = Flow[id];
        
        let addedMessages: {message: React.ReactNode, user: boolean}[] = [{
            user: false,
            message: message.message
        }]

        if (message.action) {
            switch (message.action) {
                case 'LINK_BANK':
                    addedMessages.push({
                        user: false,
                        message: (
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
                        )
                    })
                    break;
                case 'GENERATE_BUDGET':
                    const budgetResposne = await getBudgetRecommendations(responseHistory['BUDGET_GOAL'] as number)
                    setBudget(budgetResposne)
                    break;
                    case 'SHOW_BUDGET':
                        // TODO Pretty format budget
                        addedMessages.push({
                            user: false,
                            message: JSON.stringify(budget)
                        })
                        break;
                    default:
                        throw new Error('Unknown action')
            }
        }
                    
        const currentMessages = [...messages, ...addedMessages]
        setMessages(currentMessages)
        setMessageHistory([...messageHistory, id])

        if (message.responses) {
            let responseMessages: React.ReactNode[] = []
            for (const response of message.responses) {
                if (response.message) {
                    const handleClick = () => {
                        setResponses([])

                        setMessages([
                            ...currentMessages, 
                            {
                                user: true,
                                message: response.message
                            }
                        ])
                        
                        setNextMessage(response.next)
                    }
                    
                    responseMessages.push(<Button key={response.message} onClick={handleClick}>{response.message}</Button>)
                    continue
                }
                
                // TODO: add input component
                if (response.input) {
                    continue
                }
            }
        
            setResponses(responseMessages)
        }
        
        let upcomingMessage = !message.action_blocks ? message.next : undefined
        for (let flag in message.flags) {
            switch (flag) {
                case 'BANK_NOT_LINKED':
                    // TODO: add endpoint to determine if linked
                    if (true) {
                        upcomingMessage = message.flags[flag].next
                    }
                    break;
            }
        }
            
        if (upcomingMessage) {
            setNextMessage(upcomingMessage)
        }
    }
    
    useEffect(() => {
        setTimeout(() => addMessage(nextMessage), 200)
    }, [nextMessage])

    return (
        <>
            {messages.map((message, i) => <Bubble key={i} user={message.user}>{message.message}</Bubble>)}
            {responses}
        </>
    )
}

export default Conversation
