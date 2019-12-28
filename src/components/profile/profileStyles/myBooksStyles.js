import styled from 'styled-components';

const MyBooksWrapper = styled.div`
  width:100%;
`;

const MyBooksForm = styled.form`
  display:grid;
  grid-template-columns: 170px 300px;
  grid-auto-rows: minmax(30px, auto);
  grid-gap: 15px;
  grid-template-areas:
  'cover title'
  'cover author'
  'cover price'
  'cover description'
  'cover description'
  'category button';
`;

const CoverInp = styled.label`
  grid-area: cover;
  cursor:pointer;
  display:flex;
  align-items:center;
  justify-content:center;
  width:100%;
  min-height:100%;
  border: 1px dashed #d1d1d1;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center center;

  & span {
    font-size: 15px;
    line-height: 16px;
    opacity: 0.8;
    font-style: italic;
    color: #A0A4A5;
    text-align: center;
  }
`;
const Select = styled.select`
 grid-area: ${(props) => props.areaName};
 border:1px solid #d1d1d1;
 font-size: 12px;
 font-style: italic;
 line-height: 1.25;
 padding-left: 7px;
 border-radius: 3px;
`;

const TextInp = styled.input`
 grid-area: ${(props) => props.areaName};
 border:1px solid #d1d1d1;
 font-size: 12px;
 font-style: italic;
 line-height: 1.25;
 padding-left: 7px;
 border-radius: 3px;
`;

const PriceInp = styled(TextInp)`
 grid-area: price;
`;

const TextArea = styled.textarea`
 grid-area: description;
 resize: none;
 border:1px solid #d1d1d1;
 border-radius:3px;
 font-size: 12px;
 font-style: italic;
 padding: 7px;
`;
const SubmitButton = styled.button`
  grid-area: button;
  background: none;
  outline:none;
  border: none;
  cursor:pointer;
  border: 1px solid #fff;
  box-shadow: 1px 2px 2px #b5b5b5;
  width: 60%;
  border-radius: 3px;
  justify-self: left;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: #42cee2;
  &:active{
    box-shadow: none;
    transform:translateY(2px);
  }
`;

// ** BOOKLIST STYLES
const MyBLWrapper = styled.div`
  max-height: 255px;
  overflow-y: auto;
  box-shadow: 0 0 5px #cccccc;
`;
const BookWrapper = styled.div`
  display: grid;
  grid-template-columns: 70px 3fr 1fr;
  margin-bottom: 3px;
  padding-bottom: 2px;
  box-shadow: 0 1px 4px #cccccc;
`;

const InnerMinWrapper = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
`;
const SmallCover = styled.div`
  width:45px;
  height:60px;
  background-image:url(${(props) => props.url});
  background-size: cover;
  background-position: center center;
  &:hover{
    box-shadow: 3px 0 4px #a8a8a8;
    transform: scale(1.1);
  }
`;
const InnerMaxWrapper = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  & .title {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.43;
    color: #181616;
  }
  & .author {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-style: italic;
    line-height: 1.79em;
    color: #A0A4A5;
  }
`;
const PriceText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #42CEE2;
`;
export {
  MyBooksWrapper,
  MyBooksForm,
  CoverInp,
  TextInp,
  PriceInp,
  TextArea,
  SubmitButton,
  BookWrapper,
  InnerMinWrapper,
  SmallCover,
  InnerMaxWrapper,
  PriceText,
  MyBLWrapper,
  Select,
};
