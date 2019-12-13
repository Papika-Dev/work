import React from 'react';
import PropTypes from 'prop-types';
import { FavoriteCover, FavoriteGridBox } from './styles';
import { Title, LogOutButton } from '../profile/profileStyles/styles';

const ElemOfFavorites = ({ title, url, removeOnClick }) => (
  <FavoriteGridBox>
    <FavoriteCover url={url} />
    <Title>
      {title}
    </Title>
    <LogOutButton onClick={removeOnClick}>
      Удалить
    </LogOutButton>
  </FavoriteGridBox>
);

ElemOfFavorites.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  removeOnClick: PropTypes.func.isRequired,
};

export default ElemOfFavorites;
