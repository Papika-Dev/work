import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Notifications from './Notifications';
import { FlexColumn, EmptyTitle } from './styles';
import MyBookList from '../profileElements/myBooks/MyBookList';


const ProfileBoard = () => {
  const [note, setNote] = useState([]);
  const { id } = useSelector((state) => state.currentUser);
  const [newProd, setNewProd] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const resp = await fetch(`/profile/notifications/user${id}`);
      if (resp.ok) {
        const result = await resp.json();
        setNote(result);
      }
    };
    fetchNotifications();
  }, [id]);

  useEffect(() => {
    const fetchNewProduct = async () => {
      const resp = await fetch('/product/news');
      if (resp.ok) {
        const result = await resp.json();
        setNewProd(result);
      }
    };
    fetchNewProduct();
  }, [id]);
  return (
    <>
      <FlexColumn>
        {note.length > 0 ? (
          note.map((item) => (
            <Notifications
              key={item.id}
              title={item.title}
              bookId={item.id}
              count={item.count}
            />
          ))
        ) : (
          <EmptyTitle>Новых отзывов нет</EmptyTitle>
        )}
      </FlexColumn>
      {newProd.length > 0 && <MyBookList list={newProd} />}
    </>
  );
};

export default ProfileBoard;
