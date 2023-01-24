import React from 'react';
import styles from './profile.module.css';
import { NavLink, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import UserOrderModal from 'components/user-order-modal/user-order-modal';
import UserOrders from 'components/user-orders/user-orders';
import UserForm from 'components/user-form/user-form';
import LogoutPage from 'pages/logout';

const linkCN = (isActive) => {
  return `${styles.link} text text_type_main-medium ${
    isActive ? 'text_color_primary' : 'text_color_inactive'
  }`;
};

const routes = [
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
    children: <LogoutPage />,
  },
];

function ProfilePage() {
  const { url, path } = useRouteMatch();

  const location = useLocation();
  const background = location.state?.background;

  return (
    <main className={styles.layout}>
      {background && (
        <Route path={`${path}/orders/:id`}>
          <UserOrderModal />
        </Route>
      )}
      <>
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
      </>
    </main>
  );
}

export default ProfilePage;
