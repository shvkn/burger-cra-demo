import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import React, { useMemo } from 'react';

import { calcTotalPrice, getOrderStatus } from '../lib';

import styles from './styles.module.css';

const ingredientsToRenderCount = 6;

type TOrderProps = {
  order: TOrderEntity;
  hideStatus?: boolean;
};

export const Order: React.FC<TOrderProps> = ({ order, hideStatus = false }) => {
  const ingredients = order.ingredients;
  const totalPrice = useMemo(() => calcTotalPrice(ingredients), [ingredients]);
  const visibleIngredients = ingredients.slice(0, ingredientsToRenderCount);
  const extraIngredientsCount = useMemo(() => {
    return Math.max(order.ingredients.length - ingredientsToRenderCount, 0);
  }, [order.ingredients]);

  return (
    <div className={`pt-6 pr-6 pb-6 pl-6 ${styles.container}`}>
      <div className={styles.row}>
        <p className={`text text_type_digits-default ${styles.number}`}>{`#${order.number}`}</p>
        <p className={`ml-4 text text_type_main-default text_color_inactive ${styles.timestamp}`}>
          <FormattedDate date={new Date(order.createdAt)} />
        </p>
      </div>
      <div className={`mt-6`}>
        <p className={`text text_type_main-medium`}>{order.name}</p>
        {!hideStatus && (
          <p
            className={clsx(
              'mt-2 text text_type_main-small',
              order.status === 'done' && 'text_color_success'
            )}
          >
            {getOrderStatus(order.status)}
          </p>
        )}
      </div>
      <div className={`mt-6 ${styles.row}`}>
        <ul className={styles.ingredients}>
          {visibleIngredients.map((ingredient, idx) => (
            <li key={idx} className={styles.ingredient}>
              <img
                className={styles.ingredientImage}
                src={ingredient.image}
                alt={ingredient.name}
              />
              {idx === 0 && extraIngredientsCount > 0 && (
                <div className={styles.extra}>
                  <p
                    className={`text text_type_main-default ${styles.extraCount}`}
                  >{`+${extraIngredientsCount}`}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className={`ml-6 ${styles.price}`}>
          <p className={`mr-2 text text_type_digits-default`}>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
};
