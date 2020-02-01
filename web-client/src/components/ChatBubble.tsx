import React, { FC } from 'react';

const ChatBubble: FC = (props) => {
    return (
        <div className="chat-bubble-container" >
            <div className="name">{props}</div>
        </div>
    )
}

export default ChatBubble;
