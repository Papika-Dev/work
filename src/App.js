import React from 'react';
import { useSelector } from 'react-redux';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { GlobalStyles } from './components/header/headerStyles';
import MainPage from './components/pages/MainPage';
import PopUp from './components/popUp/PopUp';
import MainProfile from './components/pages/MainProfile';
import ProtectedRouter from './components/actions/protectedRouter';
import Header from './components/header/Header';
import MainBookCard from './components/pages/MainBookCard';
import Cart from './components/pages/Cart';
import Page404 from './components/pages/Page404';


function App() {
  const popUp = useSelector((state) => state.popUp);
  const activeUser = useSelector((state) => state.currentUser);
  const cart = useSelector((state) => state.cart);
  // add shop cart to local storage after reload
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('cart', JSON.stringify(cart));
  });
  return (
    <>
      <GlobalStyles isShow={popUp} />
      <div className="App">
        <Header />
        {popUp && <PopUp />}
        <Switch>
          <Route path="/" exact component={MainPage} />
          <ProtectedRouter path="/profile" isAuth={activeUser.isLogIn}>
            <MainProfile />
          </ProtectedRouter>
          <Route path="/book/:id" exact component={MainBookCard} />
          <Route path="/cart" component={Cart} />
          <Route path="/page404" component={Page404} />
          <Route path="*" component={Page404} />
        </Switch>
      </div>
    </>
  );
}

export default App;
