import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from 'react-icons-kit';
import { bookmarkO } from 'react-icons-kit/fa/bookmarkO';
import { bookmark } from 'react-icons-kit/fa/bookmark';
import { FavoriteIcon } from './styles';

const AddToFavorBtn = ({ bookId }) => {
  const [isAdd, setIsAdd] = useState(false);
  const { id } = useSelector((state) => state.authUser);

  const handlefetchData = async () => {
    const resp = await fetch(`/favorites/user${id}/book${bookId}`);
    if (resp.ok) {
      setIsAdd(true);
    }
  };

  return (
    <FavoriteIcon>
      {isAdd ? (
        <Icon icon={bookmark} size={22} />
      ) : (
        <Icon icon={bookmarkO} size={22} onClick={handlefetchData} />
      )}
    </FavoriteIcon>
  );
};

AddToFavorBtn.propTypes = {
  bookId: PropTypes.number.isRequired,
};

export default AddToFavorBtn;
