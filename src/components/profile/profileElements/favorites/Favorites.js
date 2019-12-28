import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FavoritesWrapper } from './styles';
import ElemOfFavorites from './ElemOfFavorites';
import { Title } from '../../profileStyles/styles';

const Favorites = () => {
  const [favor, setFavorites] = useState([]);
  const [reload, setReload] = useState(true);
  const { id } = useSelector((state) => state.currentUser);
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(`/profile/user/${id}/favorites`);
      if (resp.ok) {
        const result = await resp.json();
        setFavorites(result);
      }
    };
    fetchData();
  }, [id, reload]);

  const handleReloadOnRemove = () => {
    setReload(!reload);
  };
  return (
    <>
      {
        favor.length > 0 ? (
          <FavoritesWrapper>
            {favor.map((item) => (
              <ElemOfFavorites
                key={item.id}
                url={item.cover}
                title={item.title}
                id={id}
                bookId={+item.book_id}
                reloadOnRemove={handleReloadOnRemove}
              />
            ))}
          </FavoritesWrapper>
        ) : (
          <Title>
              В избранных : 0 книг
          </Title>
        )
      }
    </>
  );
};

export default Favorites;
