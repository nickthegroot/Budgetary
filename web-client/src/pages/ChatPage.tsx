import React, { FC } from 'react'
import styled from 'styled-components'
import Conversation from '../components/Conversation'



const Header = styled.div({
    border: '1px solid black',
    height: 50,
    width: '100%',
    flex: 1,
    display: 'flex',
})

const ChatPage: FC = () => {

    return (
        <div style={{ margin: 30 }}>
            <Conversation />
        </div>
    )
}


export default ChatPage;
