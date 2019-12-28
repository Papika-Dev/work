import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const ProfileWrapper = styled.section`
  display:grid;
  margin: 50px auto 49px;
  width: 100%;
  max-width: 1160px;
  grid-column-gap: 70px;
  grid-template-columns: 180px 1fr;
`;
// USER INFO STYLES
const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction:column;
  background: #262323;
  align-items:center;
  justify-content:center;
  border-radius: 4px;
  align-self: self-start;
  box-shadow: 0 0 6px #6e6e6e; 
`;

const AvatarBox = styled.div`
  border-radius: 100%;
  border: 1px solid #000;
  width: 100px;
  height: 100px;
  background: #fff;
  margin:25px 0;
  background-image:url(${(props) => props.url});
  background-size: cover;
  background-position: center center;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const Title = styled.span`
    font-size: 14px;
    line-height: 25px;
    padding-bottom: 10px;
    font-weight: bold;
    color: #A0A4A5;
`;

const LogOutButton = styled.div`
    font-size: 14px;
    line-height: 25px;
    font-weight: bold;
    margin-bottom: 15px;
    color: #42CEE2;
    cursor: pointer;
   
`;
const InputLabel = styled.label`
  cursor: pointer;
  display:block;
  display:flex;
  align-items:center;
  min-width:100%;
  min-height:100%;
  justify-content:center;
  position: relative;
  border-radius:100%;
  font-size: 34px;
`;

const AddInp = styled.input`
  display:none;
`;

// PROFILE CONTENT STYLES
const ProfContentWrapper = styled.div`
  display: flex;
  flex-direction:column;
`;
const LinksWrapper = styled.div`
  display:flex;
`;
const ProfLinks = styled(Link)`
  text-decoration: none;
  font-size: 15px;
  line-height: 20px;
  font-weight: 500;
  margin-right: 78px;
  color: #A0A4A5;
  ${(props) => props.isactive && css`
    color:#42CEE2;
    border-bottom: 2px solid #42CEE2; 
  `};
`;

const ProfContent = styled.div`
  margin-top:20px;
  max-height: 260px;
  display:grid;
  grid-column-gap: 50px;
  grid-template-columns: 1fr minmax(300px, auto);
`;

const ProfTitle = styled.span`
  font-size: 15px;
  line-height: 20px;
  font-weight: 500;
  margin-right: 105px;
  color: #E9776C;
  margin-left: auto;
`;
export {
  ProfileWrapper,
  InfoWrapper,
  AvatarBox,
  Title,
  LogOutButton,
  AddInp,
  InputLabel,
  ProfLinks,
  ProfContentWrapper,
  LinksWrapper,
  ProfContent,
  ProfTitle,
};
