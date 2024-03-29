import { NORMA_API } from 'shared/config';
import { request } from 'shared/lib';

export const createOrderRequest = (
  accessToken: string,
  ingredients: ReadonlyArray<TIngredientId>
) => {
  try {
    return request<TOrderResponseBody>(`${NORMA_API}/orders`, {
      method: 'POST',
      headers: {
        authorization: accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients }),
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};
