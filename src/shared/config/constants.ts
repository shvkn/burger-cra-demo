export const NORMA_API = 'https://norma.nomoreparties.space/api';
export const NORMA_WS_API = 'wss://norma.nomoreparties.space';
export const DndItemTypes = {
  BURGER_INGREDIENT: 'BURGER_INGREDIENT',
  SORTABLE_ITEM: 'SORTABLE_ITEM',
};
export const Messages = {
  INVALID_TOKEN: 'Token is invalid',
  INCORRECT_RESET_TOKEN: 'Incorrect reset token',
};
export const VALIDATION_RULES = {
  NAME: { required: true },
  EMAIL: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, required: true },
  PASSWORD: { minLength: 6 },
};
