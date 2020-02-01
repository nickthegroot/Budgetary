import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import ChatBubble from "../components/Bubble/ChatBubble";

export const chatBubble = () => {
    return (<ChatBubble user={text('message', 'Hello!')} />)
}

export default {
  title: "Chat Components",
  decorators: [withKnobs],
};
