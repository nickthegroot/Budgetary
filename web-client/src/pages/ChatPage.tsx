import React, { FC } from 'react';
import Bubble from "../components/Bubble/ChatBubble";
import "./ChatPage.css";

const ChatPage: FC = () => {
    return (
    <div className="chat-page-container">
        <div className="chat">
            <Bubble />
        </div>   
    </div>)
}

export default ChatPage