import React from 'react';
import PropTypes from 'prop-types';
import { FavoriteCover, FavoriteGridBox } from './styles';
import { Title, LogOutButton } from '../../profileStyles/styles';

const ElemOfFavorites = ({
  title,
  url,
  id,
  bookId,
  reloadOnRemove,
}) => {
  const removeOnClick = async () => {
    const resp = await fetch(`/profile/user${id}/book${bookId}/favorites/remove`);
    if (resp.ok) {
      reloadOnRemove();
    }
  };

  return (
    <FavoriteGridBox>
      <FavoriteCover url={url} to={`/book/${bookId}`} />
      <Title>
        {title}
      </Title>
      <LogOutButton onClick={removeOnClick}>
        Удалить
      </LogOutButton>
    </FavoriteGridBox>
  );
};

ElemOfFavorites.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  bookId: PropTypes.number.isRequired,
  reloadOnRemove: PropTypes.func.isRequired,
};

export default ElemOfFavorites;
