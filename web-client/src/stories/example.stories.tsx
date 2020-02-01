import React from "react";
import styled from 'styled-components';
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
 
export default {
  title: "Storybook Knobs",
  decorators: [withKnobs]
};
// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
 
const RedButton = styled.button({
  backgroundColor: 'red',
})

// Knobs for React props
export const withAButton = () => (
  <RedButton disabled={boolean("Disabled", false)}>
    {text("Label", "Hello Storybook")}
  </RedButton>
);
 
// Knobs as dynamic variables.
export const asDynamicVariables = () => {
  const name = text("Name", "James");
  const age = number("Age", 35);
  const content = `I am ${name} and I'm ${age} years old.`;
 
  return <div>{content}</div>;
};