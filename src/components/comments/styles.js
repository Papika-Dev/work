import styled, { css } from 'styled-components';
import { FormBtn, Input, CloseBtn } from '../popUp/styles/styles';

const CommentWrapper = styled.div`
  margin: 100px auto;
  display: grid;
  width: 500px;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  border-radius: 5px;
  box-shadow: 0 0 12px #b3b3b3;
  background: #fff;
  padding: 45px 25px;
  position:relative;
`;

const FlexBox = styled.div`
  display:flex;
  flex-direction:column;
`;

const CommentMainText = styled.span`
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.87);
  padding-bottom: 7px;
  ${(props) => props.main && css`
    font-size: 16px;
  `};
  ${(props) => props.alarm && css`
    font-size: 16px;
    color:red;
  `};
  ${(props) => props.book && css`
    font-family: 'Roboto', sans-serif;
    color: #a0a4a5;
    font-style: italic;
  `};
`;

const CommentBtn = styled(FormBtn)`
  width: 50%;
  line-height: 43px;
  align-self:center;
  transition: background 0.3s, color 0.3s;
  box-shadow: 0 3px 4px #000;
  &:hover{
    background-color: #42CEE2;
    color: #000;
  }
`;
const NameInp = styled(Input)`
  width: 90%;
  border-radius: 5px;
`;

const ComMainLabel = styled.label`
  margin-top: 12px;
  display:flex;
  flex-direction:column;
`;
const TextField = styled.textarea`
  height: 150px;
  resize: none;
  border-radius: 5px;
  font-size:14px;
  padding: 5px 4px;
`;

const CloseButton = styled(CloseBtn)`
  position:absolute;
  right: 4px;
  top: 5px;
`;
const StarLabel = styled.label`
  cursor:pointer;
  font-size: 32px;
  color: rgba(209, 209, 209, 0.6);
   ${(props) => props.five && css`
      &.one, &.two, &.three, &.four, &.five {
      color:#f7be20;
      };
   `} 
   ${(props) => props.four && css`
      &.one, &.two, &.three, &.four {
      color:#f7be20;
      };
   `} 
   ${(props) => props.three && css`
      &.one, &.two, &.three {
      color:#f7be20;
      };
   `} 
   ${(props) => props.two && css`
      &.one, &.two {
      color:#f7be20;
      };
   `} 
   ${(props) => props.one && css`
      &.one {
      color:#f7be20;
      };
   `} 
`;

const StarInp = styled.input`
  display:none;
`;
const RowGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items:center;
`;
const StarsWrapper = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
`;
export {
  CommentWrapper,
  FlexBox,
  CommentMainText,
  CommentBtn,
  NameInp,
  ComMainLabel,
  TextField,
  CloseButton,
  StarLabel,
  RowGrid,
  StarInp,
  StarsWrapper,
};
