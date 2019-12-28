import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  InfoWrapper,
  Title,
  LogOutButton,
} from '../profileStyles/styles';
import Avatar from './Avatar';
import logOut from '../../../store/actions/logOut';

const ProfileInfo = () => {
  const userInfo = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
    dispatch({ type: 'CLEAR_CART' });
  };
  return (
    <InfoWrapper>
      <Avatar name={userInfo.name} />
      <Title>
        {`${userInfo.name[0].toUpperCase()}${userInfo.name.slice(1)}`}
      </Title>
      <LogOutButton onClick={handleLogOut}>
        Выйти
      </LogOutButton>
    </InfoWrapper>
  );
};

export default ProfileInfo;
