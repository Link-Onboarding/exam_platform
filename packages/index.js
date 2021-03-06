/** @format */

import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/index.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux';
import { Provider, useDispatch } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './redux/root';
import thunk from 'redux-thunk';
import { Wrapper } from './components/Common';
import Header from './components/Header/index';
import Landing from './components/Landing/index';
import Footer from './components/Footer/index';
import { Provider as ContextProvider } from './contexts/RouteContext';
import { Exam, CreateExam } from './components/Exam';
import { AccountPage, ChangePassword, AddUser } from './components/User';
import { getUserData } from './redux/actions/user';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const Application = () => {
  const dispatch = useDispatch();
  const authToken = localStorage.getItem('authToken');
  const _tableRoutes = ['users', 'departments', 'classes', 'exams', 'questions'];

  useEffect(() => {
    if (authToken) dispatch(getUserData());
  }, []);

  return (
    <Wrapper>
      <Header />
      <Switch>
        {_tableRoutes.map((route, idx, rest) => (
          <Route
            {...rest}
            exact
            path={`/table-${route}`}
            render={() => <Landing title={route} />}
            key={idx}
          />
        ))}
        <Route path="/create-exam" exact component={CreateExam} />
        <Route path="/add-user" exact component={AddUser} />
        <Route path="/exam/:exam_id" exact component={Exam} />
        <Route path="/account" exact component={AccountPage} />
        <Route path="/change-password" exact component={ChangePassword} />
        <Route path="/" exact component={Landing} />
      </Switch>
    </Wrapper>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <ContextProvider>
      <BrowserRouter>
        <Application />
      </BrowserRouter>
    </ContextProvider>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
