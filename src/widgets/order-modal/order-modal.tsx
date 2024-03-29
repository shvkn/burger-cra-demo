import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { ingredientModel } from 'entities/ingredient';
import { OrderInfo, ordersModel } from 'entities/order';

import { getOrderIngredients, useAppSelector } from 'shared/lib';
import { Modal } from 'shared/ui';

export const OrderModal: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const order = useAppSelector(ordersModel.selectors.selectOrderById(id));
  const history = useHistory();

  const handleClose = () => {
    history.goBack();
  };
  const { entities } = ingredientModel.useIngredients();
  const mapIngredientsFn = (order: TOrder) => getOrderIngredients(order, entities);
  return order ? (
    <Modal handleClose={handleClose}>
      <Modal.Header handleClose={handleClose}>
        <p className={'text text_type_digits-default'}>{`#${order.number}`}</p>
      </Modal.Header>
      <Modal.Content>
        <OrderInfo order={order} mapIngredientsFn={mapIngredientsFn} />
      </Modal.Content>
    </Modal>
  ) : null;
};
