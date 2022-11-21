import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Routes from './components/Routes';
import { UidContext } from './components/Hook/AppContext';
import { setAuthToken } from './Helpers/setAuthToken()';
import { useDispatch } from 'react-redux';
import { GetUser } from './actions/user.action';
import { GetArticles } from './actions/articles.action';
import { GetAddress } from './actions/address.action';

const App = () => {
  const [token, setToken] = useState("")
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuthToken(token);
      setToken(token)
    }
    if (token) {
      dispatch(GetUser(token));
      dispatch(GetArticles(token));
      dispatch(GetAddress(token));
    }
  }, []);

  return (
    <UidContext.Provider value={token}>
      <div className='routes'>
        <Routes />
      </div>
    </UidContext.Provider>
  );
}

export default App;