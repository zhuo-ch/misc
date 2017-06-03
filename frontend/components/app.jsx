import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import Banner from './banner';

const App = ({store}) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path='/' component={Banner} />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
