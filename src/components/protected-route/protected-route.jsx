import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import authSelectors from 'services/selectors/auth';
import LoadingCurtain from 'components/loading-curtain/loading-curtain';
import * as authActions from 'services/actions/auth';

function ProtectedRoute({ children, component, nonAuthOnly = false, ...rest }) {
  const isAuthorized = useSelector(authSelectors.selectIsAuthorized);
  const isAuthLoading = useSelector(authSelectors.selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthLoading) {
      dispatch(authActions.getUser());
    }
  }, [dispatch]);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (isAuthLoading && !isAuthorized) {
          return <LoadingCurtain />;
        }
        if ((nonAuthOnly && !isAuthorized) || (!nonAuthOnly && isAuthorized)) {
          return children ?? React.createElement(component);
        }

        if (!nonAuthOnly && !isAuthorized) {
          return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
        }
        return <Redirect to={location.state?.from ?? '/'} />;
      }}
    />
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  nonAuthOnly: PropTypes.bool,
  component: PropTypes.elementType,
};
export default ProtectedRoute;
