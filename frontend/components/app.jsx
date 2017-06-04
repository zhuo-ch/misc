import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import BannerContainer from './banner_container';

const App = ({store}) => {
  return (
    <Provider store={store}>
      <BrowserRouter baseName='/shoplet'>
        <Route path='/' component={BannerContainer} />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
