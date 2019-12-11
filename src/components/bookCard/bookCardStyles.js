import styled from 'styled-components';
import { ProfileWrapper } from '../profile/profileStyles/styles';

const BookCardWrapper = styled(ProfileWrapper)`
  grid-column-gap: 150px;
  grid-template-columns: 2fr 1fr;
  grid-row-gap: 55px;
`;

// BOOK INFO STYLES
const BookInfoWrapper = styled.div`
  display:flex;
  flex-direction: column;
`;

const BookTitle = styled.h1`
  font-size: 30px;
  font-weight: 500;
  line-height: 1.17;
  color: #181717;
  margin-bottom: 7px;
`;

const BookStyledText = styled.p`
  font-size: 17px;
  font-style: italic;
  line-height: 1.18;
  color: #42CEE2;
  font-weight: normal;
`;

const BookMainText = styled.p`
  font-size: 15px;
  line-height: 1.67;
  color: #181717;
`;

const BookBigCoverBox = styled.div`
  height: 460px;
  width: 460px;
  margin: 45px 0 45px auto;
`;

const CoverImg = styled.img`
  max-width:100%;
  max-height:100%;
  box-shadow: 0 12px 16px #b3b3b3;
`;

// BOOK PRICE STYLES
const PriceInfoWrapper = styled.div`
  display:flex;
  flex-direction:column;
`;

const PriceTitle = styled.span`
  font-size: 24px;
  font-weight: 500;
  line-height: 1.17;
  color: #1acee2;
`;

const PriceMainText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #a0a4a5;

`;
const PriceBtn = styled.button`
  width: 260px;
  height: 52px;
  background-color: #42cee2;
  display:flex;
  justify-content:center;
  align-items:center;
  color:#fff;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: bold;
  border:none;
  cursor:pointer;
`;

const CountBox = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 35px;
  
`;

const CountBtnWrapper = styled.div`
  display:flex;
  justify-content: center;
  align-items:center;
  margin-left: 15px;
`;

const IncDecBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  width: 25px;
  height:25px;
  border: 1px solid #d6d6d6;
  cursor:pointer;
`;

const CountText = styled(PriceMainText)`
  color: #1acee2;
  padding: 0 10px;
`;

const ShowComBtn = styled(PriceBtn)`
  background: #fff;
  color: #000;
  border: 1px solid #000;
  box-shadow:2px 2px 3px #b3b3b3;
`;

// Comment Block styles

const GridBox = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 7px;
  grid-column: 1 / 3;
`;

const Block = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  width: 450px;
`;

const TextBlock = styled.div`
  grid-column: 1 / 4;
`;
export {
  BookCardWrapper,
  BookInfoWrapper,
  PriceInfoWrapper,
  BookTitle,
  BookStyledText,
  BookMainText,
  BookBigCoverBox,
  CoverImg,
  PriceTitle,
  PriceMainText,
  PriceBtn,
  CountBox,
  CountBtnWrapper,
  IncDecBtn,
  CountText,
  ShowComBtn,
  GridBox,
  Block,
  TextBlock
};
