import styled from "styled-components";
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
  float: right;
  line-height: 30px;
  transition: all ease-in-out 0.2s;
  border: 1px solid #e7ebf2;
  background-color: #409af8;
  border-radius: 10px;
  margin: 3px;
  &:hover {
    background-color: #3f86d1;
  }
`;

export { ButtonWrapper };
