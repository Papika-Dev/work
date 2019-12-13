import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import {
  ProfileWrapper,
  ProfLinks,
  ProfContentWrapper,
  LinksWrapper,
  ProfContent,
} from '../profile/profileStyles/styles';
import ProfileInfo from '../profile/profileElements/ProfileInfo';
import authOk from '../../store/actions/authOk';
import MyBooks from '../profile/profileElements/myBooks/MyBooks';
import Favorites from '../favorites/Favorites';

const MainProfile = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    const verifyUser = async () => {
      const resp = await fetch('/user/verify', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      });
      if (resp.status === 403) {
        const refreshResp = await fetch('/refresh', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('refreshToken'))}`,
          },
        });
        if (refreshResp.ok) {
          const refreshResult = await refreshResp.json();
          localStorage.setItem('token', JSON.stringify(refreshResult.token));
          localStorage.setItem('refreshToken', JSON.stringify(refreshResult.refreshToken));
          // Repeat request after refresh token
          verifyUser();
        } else {
          dispatch({ type: 'AUTH_DENIED' });
          return false;
        }
      } else {
        const result = await resp.json();
        dispatch(authOk(result));
      }
      return true;
    };
    verifyUser();
  }, [dispatch]);

  return (
    authUser.ok ? (
      <ProfileWrapper>
        <ProfileInfo />
        <ProfContentWrapper>
          <LinksWrapper>
            <ProfLinks to="/profile/mybooks">Мои книги</ProfLinks>
            <ProfLinks to="/profile/favorites">Избранное</ProfLinks>
          </LinksWrapper>
          <ProfContent>
            <Switch>
              <Route path="/profile/mybooks" component={MyBooks} />
              <Route path="/profile/favorites" component={Favorites} />
            </Switch>
          </ProfContent>
        </ProfContentWrapper>
      </ProfileWrapper>
    ) : (
      <h1 style={{ textAlign: 'center' }}>
          Loading...
      </h1>
    )
  );
};

export default MainProfile;
