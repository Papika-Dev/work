import styled, { css } from 'styled-components';

const BooksWrapper = styled.div`
  width: 100%;
  display:flex;
  flex-direction:column;
`;
const TopWrapper = styled.div`
  display:flex;
  width:100%;
`;
const ListControls = styled.div`
  flex:1 1;
`;
const ListControlsTitle = styled.div`
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  color: #A0A4A5;
  display: inline-block;
`;
const ControlsMainText = styled.div`
  cursor: pointer;
  display: inline-block;
  position: relative;
  color: #181616;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  margin: 0 8px;
`;
const NumText = styled.span`
  cursor:pointer;
  font-weight: 300;
  width: 21px;
  line-height: 20px;
  text-align: center;
  display: inline-block;
  margin: auto;
  color: #181616;
  font-size: 13px;
  border: 1px solid transparent;
  text-decoration: none;
  ${(props) => props.isActive && css`
    border-bottom-color: #42CEE2;
    font-weight: 600;
  `}
`;

const Select = styled.select`
  border: none;
  outline: none;
`;

const AlarmText = styled.span`
  grid-column: 1 / 5;
  font-size: 16px;
  text-align:center;
  color: red;
`;

export {
  BooksWrapper,
  TopWrapper,
  ListControls,
  ListControlsTitle,
  ControlsMainText,
  NumText,
  Select,
  AlarmText,
};
