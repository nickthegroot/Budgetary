import React from "react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import ChatBubble from "../components/Bubble/ChatBubble";

export const chatBubble = () => {
return (<ChatBubble user={boolean('user', false)}>{text}</ChatBubble>)
}

export default {
  title: "Chat Components",
  decorators: [withKnobs],
};
