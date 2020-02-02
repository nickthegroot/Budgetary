import styled, { css } from "styled-components";
import { BubbleProps } from "./props";

const BubbleWrapper = styled.div<BubbleProps>`
display:inline-block;
padding:15px 15px 15px 15px;
border-radius: 6px;
margin-right: 30px;
margin-left: 30px;
color:black;
position: relative;
  
  ${props => props.user ? `
  background-color: #409af8;
  color: white;
  &:after {
    content: "";
    position:absolute;
    margin-top:-6px;
    margin-left:-5px;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 12px solid #409af8;
    transform:rotate(-45deg);
    right: -15px; 
    top: 10px;
  }`:
  `
  background-color: #e7ebf2;
  &:before {
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



}`;

export { BubbleWrapper };
