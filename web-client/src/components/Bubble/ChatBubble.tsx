import React from "react";
import { BubbleWrapper } from "./bubblestyle";
import { BubbleProps } from "./props";

const Bubble: React.FC<BubbleProps> = ({
  user,
//   onClick,
//   color,
//   children,
//   disabled,
//   outline
}) => (
  <BubbleWrapper
    // onClick={onClick}
    // color={color}
    // disabled={disabled}
    // outline={outline}
  >
    {user}
  </BubbleWrapper>
);

export default Bubble;
