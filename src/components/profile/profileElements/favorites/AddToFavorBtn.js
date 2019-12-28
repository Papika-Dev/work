import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from 'react-icons-kit';
import { bookmarkO } from 'react-icons-kit/fa/bookmarkO';
import { bookmark } from 'react-icons-kit/fa/bookmark';
import { FavoriteIcon } from './styles';

const AddToFavorBtn = ({ bookId }) => {
  const [isAdd, setIsAdd] = useState(false);
  const { id } = useSelector((state) => state.currentUser);

  useEffect(() => {
    const isInFavorite = async () => {
      const resp = await fetch(`/profile/user${id}/book${bookId}/favorites`);
      if (resp.ok) {
        const result = await resp.json();
        setIsAdd(result.isFavor);
      }
    };
    if (id) {
      isInFavorite();
    }
  }, [id, bookId]);

  const handleRemoveFromFavorites = async () => {
    const resp = await fetch(`/profile/user${id}/book${bookId}/favorites/remove`);
    if (resp.ok) {
      const result = await resp.json();
      setIsAdd(result.isFavor);
    }
  };

  const handleSetInFavorites = async () => {
    const resp = await fetch(`/favorites/user${id}/book${bookId}`);
    if (resp.ok) {
      setIsAdd(true);
    }
    return true;
  };

  return (
    <FavoriteIcon>
      {isAdd ? (
        <Icon icon={bookmark} size={22} onClick={handleRemoveFromFavorites} />
      ) : (
        <Icon icon={bookmarkO} size={22} onClick={handleSetInFavorites} />
      )}
    </FavoriteIcon>
  );
};

AddToFavorBtn.propTypes = {
  bookId: PropTypes.number.isRequired,
};

export default AddToFavorBtn;
