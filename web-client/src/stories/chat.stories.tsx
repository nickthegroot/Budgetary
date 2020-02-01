import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import ChatBubble from "../components/Bubble/ChatBubble";

export const chatBubble = () => {
<<<<<<< HEAD
    return (<ChatBubble
      user={text('message', 'Hello!')}
      propFor={text('propfor', 'user')}
      />)
=======
    return (<ChatBubble user={text('message', 'Hello!')} />)
>>>>>>> 301c4e1584fcfc5c8bd34e6ccd2165dfe251225e
}

export default {
  title: "Chat Components",
  decorators: [withKnobs],
};
