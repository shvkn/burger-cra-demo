import { createAction } from '@reduxjs/toolkit';

export const onOpen = createAction('userOrders/websocket/on-open');
export const onGetMessage = createAction('userOrders/websocket/on-get-message');
export const onClose = createAction('userOrders/websocket/on-close');
export const close = createAction('userOrders/websocket/close');
export const connect = createAction('userOrders/websocket/connect');
export const sendMessage = createAction('userOrders/websocket/send-message');
