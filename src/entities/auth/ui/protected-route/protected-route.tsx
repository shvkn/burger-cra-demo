import React from 'react';
import { RouteProps } from 'react-router';
import { Redirect, Route } from 'react-router-dom';

import { authModel } from 'entities/auth';

import { useAppDispatch, useAppHistory, useConstructor } from 'shared/lib';
import { LoadingCurtain } from 'shared/ui';

type TProtectedRouteProps = {
  nonAuthOnly?: boolean;
} & RouteProps;

export const ProtectedRoute: React.FC<TProtectedRouteProps> = ({
  children,
  component,
  nonAuthOnly = false,
  ...rest
}) => {
  const { isAuthorized, isLoading } = authModel.useAuth();
  const dispatch = useAppDispatch();
  const { location } = useAppHistory();
  const authOnly = !nonAuthOnly;

  useConstructor(() => {
    dispatch(authModel.actions.getUser());
  });

  if (isLoading && !isAuthorized) {
    return <LoadingCurtain />;
  }
  if (authOnly && !isAuthorized) {
    return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
  }
  if (nonAuthOnly && isAuthorized) {
    return <Redirect to={location.state?.from ?? '/'} />;
  }

  return children ? (
    <Route {...rest}>{children}</Route>
  ) : component ? (
    <Route {...rest} component={component} />
  ) : null;
};
