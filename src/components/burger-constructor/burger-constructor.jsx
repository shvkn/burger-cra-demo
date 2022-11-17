import React, { useContext, useEffect, useReducer, useState } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { IngredientsContext } from '../../services/context/ingredients-context';
import {
  burgerConstructorInitState,
  burgerConstructorReducer,
  orderInitState,
  orderReducer,
} from '../../services/reducers/burger-constructor';
import {
  CONSTRUCTOR_ADD_INGREDIENT,
  ORDER_MAKE_FAIL,
  ORDER_MAKE_REQUEST,
  ORDER_MAKE_SUCCESS,
  CONSTRUCTOR_REMOVE_INGREDIENT,
  CONSTRUCTOR_RESET,
} from '../../services/actions/burger-constructor';
import { postOrder } from '../../utils/burger-api';

function BurgerConstructor() {
  const ingredients = useContext(IngredientsContext);
  const [showModal, setShowModal] = useState(false);
  const [burger, dispatchBurger] = useReducer(burgerConstructorReducer, burgerConstructorInitState);
  const [order, dispatchOrder] = useReducer(orderReducer, orderInitState);

  useEffect(() => {
    dispatchBurger({ type: CONSTRUCTOR_RESET });
    dispatchBurger({
      type: CONSTRUCTOR_ADD_INGREDIENT,
      ingredient: ingredients.find(({ type }) => type === 'bun'),
    });
    ingredients
      .filter(({ type }) => type !== 'bun')
      .forEach((ingredient) => dispatchBurger({ type: CONSTRUCTOR_ADD_INGREDIENT, ingredient }));
  }, [dispatchBurger, ingredients]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleRemove = (index) => dispatchBurger({ type: CONSTRUCTOR_REMOVE_INGREDIENT, index });

  const handleMakeOrder = () => {
    dispatchOrder({ type: ORDER_MAKE_REQUEST });
    const items = [burger.bun._id, ...burger.ingredients.map(({ _id }) => _id), burger.bun._id];
    postOrder(items)
      .then(({ success, order }) => {
        if (!success) throw new Error('error');
        dispatchOrder({ type: ORDER_MAKE_SUCCESS, number: order.number });
        handleOpenModal();
      })
      .catch((error) => {
        console.error(error);
        dispatchOrder({ type: ORDER_MAKE_FAIL });
      });
  };
  return (
    <div className={`${styles.burgerConstructor}`}>
      {showModal && !order.isFailed && (
        <Modal handleClose={handleCloseModal}>
          <OrderDetails number={order.number} />
        </Modal>
      )}
      {(burger.bun || burger.ingredients.length) && (
        <div className={`ml-4 ${styles.container}`}>
          <div className={`ml-8 ${styles.bun}`}>
            <ConstructorElement
              text={`${burger.bun.name} (верх)`}
              thumbnail={burger.bun.image}
              price={burger.bun.price}
              type='top'
              isLocked
            />
          </div>
          <ul className={`${styles.ingredients} mt-10 scroll`}>
            {burger.ingredients.map(({ image, name, price }, index) => {
              return (
                // TODO Временно отключено для использования `index` в `key`
                // eslint-disable-next-line react/no-array-index-key
                <li key={index} className={`mt-4 mb-4 ${styles.ingredient}`}>
                  <span className={styles.draggable}>
                    <DragIcon type='primary' />
                  </span>
                  <ConstructorElement
                    text={name}
                    thumbnail={image}
                    price={price}
                    handleClose={() => handleRemove(index)}
                  />
                </li>
              );
            })}
          </ul>
          <div className={`ml-8 ${styles.bun}`}>
            <ConstructorElement
              text={`${burger.bun.name} (низ)`}
              thumbnail={burger.bun.image}
              price={burger.bun.price}
              type='bottom'
              isLocked
            />
          </div>
        </div>
      )}
      <div className={`pt-10 pb-10 pr-4 ${styles.panel}`}>
        <div className={`mr-10 ${styles.price}`}>
          <p className='mr-2 text text_type_digits-medium'>{burger.totalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button type='primary' size='large' htmlType='button' onClick={handleMakeOrder}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;
