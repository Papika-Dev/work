import styled, { createGlobalStyle, css } from 'styled-components';
import { Link } from 'react-router-dom';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    line-height: 1.15;
    background:#fff;
    ${(props) => props.isShow && css`
    overflow-y:hidden;
    `}
  }
  *{
    padding:0;
    margin:0;
    box-sizing:border-box;
  }

`;
// ---------------------->Header_top Styles <-----------------

const HeaderTopWrapper = styled.div`
  background:#262323;
`;

const HeaderTopInner = styled.div`
  display:flex;
  height:40px;
  margin: 0 auto;
  padding: 0 60px;
  flex-direction: row;
  width: 100%;
  max-width: 1560px;
`;
const HeaderLogo = styled(Link)`
  text-decoration: none;
  display:flex;
  flex:1 1;
  align-items:center;
  color:#E9776C;
`;

const HeaderRight = styled.div`
  display:flex;
  flex:1 1;
  justify-content:flex-end;
  align-items:center;

`;
const HeaderTopLinks = styled(Link)`
  font-size:12px;
  height:25px;
  color:#42CEE2;
  text-decoration:none;
  display:flex;
  align-items:center;
`;
const HeaderTopText = styled.span`
  color:#a0a4a5;
  font-size:11px;
  height:25px;
  line-height:18px;
  font-weight:500;
  display:inline-block;
  padding: 2px 10px 0 15px;
  display:flex;
  align-items:center;
  cursor:pointer;
`;

// ------------------------> Header_mid styles <------------------------

const HeaderMidWrapper = styled.div`
  display:grid;
  margin: 0 auto;
  padding: 20px 60px;
  width: 100%;
  max-width: 1560px;
  grid-template-columns: 1fr 4fr 1fr;
`;
const HeaderMidLogo = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  & span:nth-child(1){
    font-size:13px;
    font-weight:400;
  }
  & span:nth-child(2){
    color:#E9776C;
    font-size:16px;
    font-weight:500;
  }
`;
const SearchForm = styled.form`
  display:flex;
  justify-content:center;
  position:relative;
`;
const SearchInput = styled.input.attrs((props) => ({
  widthOnFocus: props.isFocus ? 100 : 40,
}))`
  height: 40px;
  border: solid 1px #e5e5e5;
  display: block;
  max-width:${(props) => props.widthOnFocus}%;
  width: 100%;
  outline: none;
  padding: 0 25px;
  background: none;
  transition: all 0.3s ease-in-out;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
`;
const HeaderMidRight = styled.div`
  display:flex;
  align-items:center;
  justify-content:flex-end;
`;
const Cart = styled(Link)`
  color:#000;
  text-decoration:none;
`;

const FullCart = styled.span`
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:11px;
  font-weight:bold;
  color:#E9776C;
  width: 22px;
  height: 22px;
  border-radius: 100%;
  border: 1px solid #000;

`;

const FavorIconBox = styled.span`
 color:#000;
 margin-right:15px;
 cursor: pointer;
`;

const PopUpDiv = styled.div`
  position:absolute;
  display:grid;
  width:${(props) => (props.isFocus ? '100%' : '40%')};
  top: 50px;
  transition: all 0.3s ease-in-out;
  grid-template-columns: 1fr;
  grid-auto-rows: 25px;
  background-color:#fff;
  opacity: 0.6;
`;

const PopUpRow = styled.span`
  color:#42CEE2;
  cursor: pointer;
  max-width:max-content;
  &:hover{
    color: #61e7fa;
  }
`;
export {
  // HeaderTop
  GlobalStyles,
  HeaderTopWrapper,
  HeaderTopInner,
  HeaderLogo,
  HeaderRight,
  HeaderTopLinks,
  HeaderTopText,
  // HeaderMid
  HeaderMidWrapper,
  HeaderMidLogo,
  SearchInput,
  HeaderMidRight,
  Cart,
  FavorIconBox,
  SearchForm,
  FullCart,
  PopUpDiv,
  PopUpRow,
};
