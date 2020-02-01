import React from 'react';
import './App.css';
import ChatBubble from "./components/Bubble/ChatBubble";

const App = () => {
  return (
    <div className="App">
      <div className="home-container">
        <ChatBubble/>
      </div>
    </div>
  );
}

export default App;
