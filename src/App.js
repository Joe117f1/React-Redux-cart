import { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';

let isInitialload = true;

const App = () => {
  const dispatchFunc = useDispatch();
  const isCart = useSelector(state => state.uiReducer.isCartShown);
  const cart = useSelector(state => state.cartReducer);
  const notification = useSelector(state => state.uiReducer.notification);

  useEffect(() => {
    dispatchFunc(fetchCartData())
  }, [dispatchFunc]);

  useEffect(() => {
    if (isInitialload) {
      isInitialload = false;
      return;
    }

    if (cart.isChanged) {
      dispatchFunc(sendCartData(cart));
    }
  }, [cart, dispatchFunc]);

  return (
    <Fragment>
      {notification && <Notification
        status={notification.status}
        title={notification.title}
        message={notification.message}
      />}
      <Layout>
        {isCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
};

export default App;
