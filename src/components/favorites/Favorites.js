import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FavoritesWrapper } from './styles';
import ElemOfFavorites from './ElemOfFavorites';
import { Title } from '../profile/profileStyles/styles';

const Favorites = () => {
  const [favor, setFavorites] = useState([]);
  const { id } = useSelector((state) => state.authUser);
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(`profile/user/${id}/favorites`);
      if (resp.ok) {
        const result = await resp.json();
        setFavorites(result);
      }
    };
    fetchData();
  }, [id]);
  return (
    <>
      {
        favor.length > 0 ? (
          <FavoritesWrapper>
            {favor.map((item) => (
              <ElemOfFavorites
                key={item.id}
                url={item.url}
                title={item.cover}
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
