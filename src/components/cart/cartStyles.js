import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const BackgroundWrapper = styled.section`
  background: #F5F5F5;
`;

const CartWrapper = styled.div`
  margin: 70px auto 49px;
  width: 100%;
  max-width: 1160px;
  display: flex;
  flex-direction: column;
`;

const CartTitle = styled.span`
  font-size: 21px;
  line-height: 25px;
  font-weight: bold;
  margin: 15px 0;
`;
const CartSubTitle = styled.span`
  align-self: flex-end;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;

  ${(props) => props.btn && css`
    cursor: pointer;
    margin: 10px 0;
    &:hover{
      color: #42CEE2;
    }
  `}
`;
const Row = styled.div`
  background: #fff;
  display: grid;
  height: 135px;
  margin: 10px 0;
  padding: 10px 0 10px 5px;
  border-radius: 3px;
  box-shadow: 0 4px 5px #b3b3b3;
  grid-template-columns: 100px 1fr minmax(150px, auto) minmax(150px, auto) minmax(150px, auto) 50px;
`;

const RowBookCover = styled.img`
  max-width: 100%;
  width: 100%;
  height:100%;
  box-shadow: 0 4px 5px #b3b3b3;
`;
const RowCursiveText = styled.span`
  font-size: 15px;
  line-height: 20px;
  font-style: italic;
  color: #A0A4A5;
  padding-top: 15px;
`;
const RowInfo = styled.div`
  display:flex;
  flex-direction: column;
  margin-left: 70px;
`;
const CartRowTitle = styled(Link)`
  text-decoration:none;
  color: #42CEE2;
  font-size: 15px;
  line-height: 20px;
  font-weight: 500;
  width: max-content;
`;
const CartMainText = styled.span`
  font-size: 12px;
  line-height: 20px;
  color: #A0A4A5;
  font-weight: 500;
`;

const CartNumText = styled.span`
  font-size: 16px;
  font-weight: 500;
  padding-top:5px;
  vertical-align:center;
  align-self: self-start;
`;

const CartDeleteBtn = styled.div`
  width:24px;
  height:24px;
  display:flex;
  justify-content:center;
  align-items:center;
  cursor:pointer;

  &:hover{
    color:#42CEE2;
  }
`;

// CartResult Styles

const WhiteBGWrapper = styled.section`
  background:#fff;
`;

const ResultWrapper = styled(CartWrapper)`
  align-items: flex-end;
`;

// Cart Title Row styles

const TitleRow = styled(Row)`
    height: auto;
    box-shadow:none;
    background:none;
    margin: 0;
`;

const CartButton = styled(Link)`
  text-decoration: none;
  width: 200px;
  align-self: center;
  font-size: 14px;
  line-height: 56px;
  display: inline-block;
  background-color: #181616;
  color: #FFFFFF;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  border: none;
  margin: 25px 0;
`;
export {
  BackgroundWrapper,
  CartWrapper,
  CartTitle,
  CartSubTitle,
  Row,
  RowBookCover,
  CartRowTitle,
  CartMainText,
  CartNumText,
  RowCursiveText,
  CartDeleteBtn,
  RowInfo,
  WhiteBGWrapper,
  ResultWrapper,
  TitleRow,
  CartButton,
};
