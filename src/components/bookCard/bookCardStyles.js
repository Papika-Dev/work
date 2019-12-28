import styled, { css } from 'styled-components';
import { ProfileWrapper } from '../profile/profileStyles/styles';

const BookCardWrapper = styled(ProfileWrapper)`
  grid-column-gap: 150px;
  grid-template-columns: 2fr 1fr;
  grid-row-gap: 15px;
`;

// BOOK INFO STYLES
const BookInfoWrapper = styled.div`
  display:flex;
  flex-direction: column;
`;
const TitleRowGrid = styled.div`
  display:grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
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
  ${(props) => props.small && css`
    flex-direction: row;
    position:relative;
    align-items:center;
  `}
`;

const PriceTitle = styled.span`
  font-size: ${(props) => (props.small ? '16px' : '24px')};
  font-weight: 500;
  line-height: ${(props) => (props.small ? '30px' : '1.17')};
  color: #1acee2;
  ${(props) => props.isHover && css`
    color: #fff;
    background-color:#1acee2;
    padding: 0 3px;
  `}
`;

const PriceMainText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #a0a4a5;
  ${(props) => props.small && css`
    display: none;
  `};

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
  ${(props) => props.small && css`
    width: 30px;
    height: 30px;
    display: ${props.isHover ? 'flex' : 'none'};
  `};
`;

const CountBox = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 35px;
  ${(props) => props.small && css`
    position: absolute;
    right:5px;
    top:5px;
    margin:0;
    display: ${props.isHover ? 'flex' : 'none'};
  `}
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

// BookRating styles

const ROStarWrapper = styled.div`
  display:flex;
  justify-content:flex-end;
`;
const BookReadOnlyStars = styled.span`
  font-size: 32px;
  color: rgba(209, 209, 209, 0.6);
`;

const SvgStar = styled.svg.attrs((props) => ({
  starFill: () => {
    switch (props.rating) {
    case 1:
      return css`
        &#one path {
          fill: #f7be20;
        }
        `;
    case 2:
      return css`
        &#one path, &#two path {
          fill: #f7be20;
        }
          `;
    case 3:
      return css`
        &#one path, &#two path, &#three path {
          fill: #f7be20;
        }
        `;
    case 4:
      return css`
         &#one path, &#two path, &#three path, &#four path {
          fill: #f7be20;
        }
        `;
    case 5:
      return css`
          & path {
          fill: #f7be20;
        }
        `;
    default:
      return '';
    }
  },
}))`
& path {
    fill: rgba(209, 209, 209, 0.6);
  }

${(props) => props.starFill}

${(props) => props.isdec && css`
& path {
    fill: url(#grad);
  }
`}
  

`;

export {
  BookCardWrapper,
  BookInfoWrapper,
  PriceInfoWrapper,
  TitleRowGrid,
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
  ROStarWrapper,
  BookReadOnlyStars,
  SvgStar,
};
