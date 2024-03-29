import React from 'react';
import { Provider } from 'react-redux';

// eslint-disable-next-line boundaries/element-types
import { store } from '../store';

// eslint-disable-next-line react/display-name
export const withStore = (component: () => React.ReactNode) => () => {
  return <Provider store={store}>{component()}</Provider>;
};
