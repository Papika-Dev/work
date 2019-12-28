import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  ProfileWrapper,
  ProfLinks,
  ProfContentWrapper,
  LinksWrapper,
  ProfContent,
  ProfTitle,
} from '../profile/profileStyles/styles';
import ProfileInfo from '../profile/profileElements/ProfileInfo';
import MyBooks from '../profile/profileElements/myBooks/MyBooks';
import Favorites from '../profile/profileElements/favorites/Favorites';
import setUrl from '../../store/actions/setUrl';
import toLocalStorage from '../../store/actions/toLocalStorage';
import ProfileBoard from '../profile/mainBoard/ProfileBoard';
import logOut from '../../store/actions/logOut';
import Page404 from './Page404';

const MainProfile = () => {
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useDispatch();
  const isBooks = useRouteMatch('/profile/mybooks');
  const isFavor = useRouteMatch('/profile/favorites');
  const match = useRouteMatch();

  useEffect(() => {
    const verifyUser = async () => {
      const resp = await fetch('/user/verify', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))} ${JSON.parse(localStorage.getItem('refreshToken'))}`,
        },
      });
      if (resp.ok) {
        const result = await resp.json();
        if (result.token) {
          dispatch(toLocalStorage(result.token, result.refreshToken));
        }
        dispatch(setUrl(result.avatar));
        setIsAuth(true);
      } else {
        dispatch(logOut());
        dispatch({ type: 'CLEAR_CART' });
      }
    };
    verifyUser();
  }, [dispatch]);

  return (
    <>
      {isAuth ? (
        <ProfileWrapper>
          <ProfileInfo />
          <ProfContentWrapper>
            <LinksWrapper>
              <ProfLinks
                to="/profile/mybooks"
                isactive={isBooks}
              >
                Мои книги
              </ProfLinks>
              <ProfLinks
                to="/profile/favorites"
                isactive={isFavor}
              >
                Избранное
              </ProfLinks>
              {(!isBooks && !isFavor) && <ProfTitle> Новинки</ProfTitle>}
              {isBooks && <ProfTitle> Мои книги</ProfTitle>}
            </LinksWrapper>
            <ProfContent>
              <Switch>
                <Route path="/profile/mybooks" exact component={MyBooks} />
                <Route path="/profile/favorites" exact component={Favorites} />
                <Route path={match.path} exact component={ProfileBoard} />
                <Route path="*" component={Page404} />
              </Switch>
            </ProfContent>
          </ProfContentWrapper>
        </ProfileWrapper>
      ) : (
        <h1 style={{ textAlign: 'center' }}>
            Loading...
        </h1>
      )}
    </>
  );
};

export default MainProfile;
