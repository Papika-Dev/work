import styled from 'styled-components';
import { FavorIconBox } from '../header/headerStyles';

const FavoritesWrapper = styled.div`
  grid-column: 1 / 3;
`;

const FavoriteGridBox = styled.div`
  display:grid;
  width: 120px;
  height: 170px;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 25px 25px;
`;

const FavoriteCover = styled.div`
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
