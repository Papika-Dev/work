import styled from 'styled-components';
import { CloseBtn } from '../../popUp/styles/styles';

const FilterWrapper = styled.div`
  width:100%;
  display:grid;
  grid-template-rows: 22px auto 1fr;
  grid-template-columns: 1fr;
  & h1{
    font-family: Roboto;
    font-size: 21px;
    font-weight: bold;
    line-height: 24px;
    color: #a0a4a5;
  }
`;
const FilterForm = styled.form`
  display:flex;
  flex-direction:column;
`;

const FilterTitle = styled.span`
  margin-top:35px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.54;
  text-align: left;
  color: #a0a4a5;
  margin-bottom: 15px;
`;

const Label = styled.label`
  user-select: none;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.67;
  text-align: left;
  color: #181616;
  cursor: pointer;
  margin-bottom:5px;
  & input {
    display:none;
  }
  &:hover{
    color:#42CEE2;
  }
`;
const CustomFilterForm = styled.form`
  display:flex;
  flex-direction:column;
  position:relative;
`;
const PriceFilter = styled.div`
  display:flex;
  flex-direction:column;
`;
const InputBox = styled.div`
  flex:1 1 auto;
  display:flex;
  align-items:center;
  justify-content:space-around;
`;
const PriceInpLabel = styled.label`
  line-height:30px;
  flex: 0 0 auto;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.33;
  color: #181616;
  display: block;
  align-self:center;
`;
const PriceInput = styled.input`
  min-width: 60px;
  max-width:75px;
  width:100%;
  flex:0 0 auto;
  padding: 0 10px 0 10px;
  height: 30px;
  border: 1px solid #d2d1d1;
  display: block;
  outline: none;
  box-sizing: border-box;
  font-size: 12px;
  position: relative;
`;
const CheckBoxLabel = styled(PriceInpLabel)`
  display:flex;
  width:100%;
  align-items:center;
  & input {
    display:none;
  }
`;

const InputCheckBox = styled.div`
  display: block;
  width: 16px;
  height: 16px;
  border: 1px solid #B7B7B7;
  cursor: pointer;
  overflow: hidden;
  background-color: #fff;
  margin-right:22px;
  position:relative;

  &::before{
    content:"";
    display:${(props) => (props.isSale ? 'block' : 'none')};
    position:absolute;
    left:50%;
    top:50%;
    width:10px;
    height:10px;
    background-color:#42CEE2;
    transform: translate(-50%, -50%);
  }
`;
const ResetBtn = styled(CloseBtn)`
  position:absolute;
  top: 71px;
  right: -20px;
`;
export {
  FilterWrapper,
  FilterForm,
  FilterTitle,
  Label,
  CustomFilterForm,
  PriceFilter,
  InputBox,
  PriceInpLabel,
  PriceInput,
  CheckBoxLabel,
  InputCheckBox,
  ResetBtn,
};
