import React from 'react';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
// TODO
// import LogoutPage from 'pages/logout';

import { UserOrders } from 'widgets/user-orders';

import { UserForm } from 'features/edit-user';

import styles from './profile.module.css';

const linkCN = (isActive: boolean): string => {
  return `${styles.link} text text_type_main-medium ${
    isActive ? 'text_color_primary' : 'text_color_inactive'
  }`;
};

const routes: ReadonlyArray<TRouteItem> = [
  {
    path: '',
    title: 'Профиль',
    exact: true,
    sidebar: 'В этом разделе вы можете изменить свои персональные данные',
    children: <UserForm />,
  },
  {
    path: '/orders',
    title: 'Лента заказов',
    exact: false,
    sidebar: 'В этом разделе вы можете просмотреть свою историю заказов',
    children: <UserOrders />,
  },
  {
    path: '/logout',
    title: 'Выход',
    children: null, // TODO
  },
];

export const ProfilePage: React.FC = () => {
  const { url } = useRouteMatch();

  return (
    <main className={styles.layout}>
      <div className={`mt-30 ${styles.sidebar}`}>
        <ul className={styles.links}>
          {routes.map((route, idx) => {
            return (
              <li key={idx} className={'pt-4 pb-4'}>
                <NavLink exact={route.exact} to={`${url}${route.path}`} className={linkCN}>
                  {route.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <Switch>
          {routes.map((route, idx) => {
            return route.sidebar ? (
              <Route key={`${idx}_`} exact={route.exact} path={`${url}${route.path}`}>
                <p className={`mt-20 text text_type_main-default text_color_inactive`}>
                  {route.sidebar}
                </p>
              </Route>
            ) : null;
          })}
        </Switch>
      </div>
      <div className={`ml-15 mt-10 ${styles.content}`}>
        <Switch>
          {routes.map((route, idx) => {
            return route.children ? (
              <Route key={idx} exact={route.exact} path={`${url}${route.path}`}>
                {route.children}
              </Route>
            ) : null;
          })}
        </Switch>
      </div>
    </main>
  );
};
