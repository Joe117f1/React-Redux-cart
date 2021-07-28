import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import classes from './CartButton.module.css';

const CartButton = () => {
  const cartQuantity = useSelector(state => state.cartReducer.totalQuantity);
  const dispacthFunc = useDispatch();

  const toggleCartHandler = () => {
    dispacthFunc(uiActions.toggleCart());
  };
  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
