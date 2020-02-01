import styled, { css } from "styled-components";
import { ButtonProps } from "./interface";

const ButtonWrapper = styled.button<ButtonProps>`
  display: inline-block;
  padding: 8px 16px;
  min-width: 100px;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  text-align: center;
  font-weight: 600;
  color: white;
  width: 100%;
  line-height: 30px;
  transition: all ease-in-out 0.2s;
  color: black;
  border: 1px solid #e7ebf2;
  background-color: white;
  &:hover {
    background-color: #e7ebf2;
  }
  ${props =>
    props.color === "red" &&
    css`
      a {
        color: white;
      }
      background-color: rgb(255, 131, 121) ;
      border: .5px solid black;
      border-radius: 8px;
      color: white;
      &:hover {
        background-color: rgb(255, 131, 80);
      }
    `}
`;

export { ButtonWrapper };
