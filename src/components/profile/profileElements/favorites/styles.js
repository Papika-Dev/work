import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FavorIconBox } from '../../../header/headerStyles';

const FavoritesWrapper = styled.div`
  grid-column: 1 / 3;
  background-color:#F5F5F5;
`;

const FavoriteGridBox = styled.div`
  display:inline-grid;
  width: 120px;
  height: 170px;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 25px 25px;
  margin: 10px 10px 5px;
  background-color: #fff;
  box-shadow: 0 0 6px #b5b5b5;
  padding: 4px;
  text-align: center;
`;

const FavoriteCover = styled(Link)`
  max-width: 100%;
  width: 100%;
  min-height: 100%;
  background-image:url(${(props) => props.url});
  background-size: cover;
  background-position: center center;
`;

const FavoriteIcon = styled(FavorIconBox)`
  text-align:right;
  cursor:pointer;

  & i:hover{
    color:#42cee2;
  };
`;

export {
  FavoritesWrapper,
  FavoriteGridBox,
  FavoriteCover,
  FavoriteIcon,
};
