import styled, { css } from "styled-components";
import { BubbleProps } from "./props";

const BubbleWrapper = styled.div<BubbleProps>`
display:inline-block;
padding:15px 15px 15px 15px;
border-radius: 6px;
float: right;
margin-right: 40px;
color:black;
background-color:#e7ebf2;
position: relative;
  
  ${props => props.propFor === "user" ? `&:after {
    content: "";
    position:absolute;
    margin-top:-6px;
    margin-left:-5px;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 12px solid #e7ebf2;
    transform:rotate(-45deg);
    right: -15px; 
    top: 10px;
  }`:
  `&:before {
    content: "";
    position:absolute;
    margin-top:-6px;
    margin-left:-5px;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 12px solid #e7ebf2;
    transform:rotate(45deg);
    left: -10px; 
    top: 10px;
  }`}
  ${props =>
    props.color === "red" &&
    css`
      a {
        color: white;
      }
      background-color: white ;
      border: 1px solid #6713c4;
      box-shadow: 0 2px 0 #6713c4, 1px 3px 6px #6713c4;
      color: white;
      &:hover {
        background-color: #6713c4;
      }
    `}

animation: myfirst 2s;
animation-direction: alternate-reverse;
}
@keyframes myfirst {
0%   { left: 0px; top: 0px;}
100%  { left: 0px; top: 500px;}

}`;

export { BubbleWrapper };
