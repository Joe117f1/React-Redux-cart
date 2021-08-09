import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

const FIRE_BASE_URL = process.env.REACT_APP_NON_SECRET_URL;

export const fetchCartData = () => {
  return async (dispatchFunc) => {
    const fetchData = async () => {
      const response = await fetch(FIRE_BASE_URL);

      if (!response.ok) {
        throw new Error('Fetch cart data failed!');
      }

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatchFunc(cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity,
      }));
    } catch (error) {
      dispatchFunc(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'We couldn\'t get your cart :/ \n Let\'s try a bit later',
      }));
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatchFunc) => {
    dispatchFunc(uiActions.showNotification({
      status: 'pendig',
      title: 'Sending...',
      message: 'Sending cart data',
    }));

    const sendRequest = async () => {
      const response = await fetch(FIRE_BASE_URL, {
        method: 'PUT',
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity
        }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }
    };
    try {
      await sendRequest();
      dispatchFunc(uiActions.showNotification({
        status: 'success',
        title: 'Success',
        message: 'Cart data sent successfuly',
      }));
    } catch (error) {
      dispatchFunc(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'sending cart data failed :/',
      }));
    }
  };
};