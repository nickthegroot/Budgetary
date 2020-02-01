import React from "react";
import { BubbleWrapper } from "./bubblestyle";
import { BubbleProps } from "./props";

const Bubble: React.FC<BubbleProps> = ({
  user,
  propFor,
//   color,
//   children,
//   disabled,
//   outline
}) => (
  <BubbleWrapper
    propFor={propFor}
    // color={color}
    // disabled={disabled}
    // outline={outline}
  >
    {user}
  </BubbleWrapper>
);

export default Bubble;
