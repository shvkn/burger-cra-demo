import React, { FC, useMemo } from 'react';
import _ from 'lodash';
import styles from './order-info.module.css';
import OrderStatus from 'components/order-status';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { TOrder } from 'services/types/data';
import { useAppSelector } from 'services/slices';
import ingredientsSelectors from 'services/selectors/ingredients';
import { getOrderIngredients, getOrderTotalPrice } from 'utils/utils';

type TOrderInfoProps = {
  order: TOrder;
};

const OrderInfo: FC<TOrderInfoProps> = ({ order }) => {
  const ingredientsEntities = useAppSelector(ingredientsSelectors.selectEntities);
  const ingredients = getOrderIngredients(order, ingredientsEntities);
  const totalPrice = getOrderTotalPrice(order, ingredientsEntities);
  console.log({ totalPrice });
  const uniqIngredients = useMemo(() => _.uniqBy(ingredients, '_id'), [ingredients]);
  const ingredientsCounts = useMemo(() => _.countBy(order.ingredients), [order.ingredients]);

  return (
    <article className={styles.container}>
      <h1 className={'mt-5 text text_type_main-medium'}>{order.name}</h1>
      <p
        className={`mt-2 text text_type_main-default ${
          order.status === 'done' && 'text_color_success'
        }`}
      >
        <OrderStatus status={order.status} />
      </p>
      <h2 className={'mt-15 mb-6 text text_type_main-medium'}>Состав:</h2>
      <ul className={`${styles.ingredients} scroll`}>
        {uniqIngredients.map((ingredient) => (
          <li key={ingredient._id} className={`mt-4 mr-6 ${styles.ingredient}`}>
            <img className={styles.ingredientImage} src={ingredient.image} alt={ingredient.name} />
            <p className={`ml-4 text text_type_main-default ${styles.ingredientName}`}>
              {ingredient.name}
            </p>
            <div className={`ml-4 ${styles.price}`}>
              <p className='mr-2 text text_type_digits-default'>{`${
                ingredientsCounts[ingredient._id]
              } x ${ingredient.price}`}</p>
              <CurrencyIcon type='primary' />
            </div>
          </li>
        ))}
      </ul>
      <div className={`mt-10 mb-10 ${styles.panel}`}>
        <FormattedDate
          date={new Date(order.createdAt)}
          className={`text text_type_main-default text_color_inactive ${styles.date}`}
        />
        <div className={`ml-2 ${styles.price}`}>
          <p className='mr-2 text text_type_digits-default'>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </article>
  );
};

export default OrderInfo;
