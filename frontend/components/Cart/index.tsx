import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../globalStore/hooks';
import { selectUser, updateAccountBalance } from '../../globalStore/slices/authSlice';
import { useCompleteOrderMutation } from '../../services/shopping-cart';
import { ICartItem } from '../../types';
import CartItem from '../CartItem';
import styles from './Cart.module.scss';

type Props = {
  cartItems: ICartItem[];
  addToCart: (clickedItem: ICartItem) => void;
  removeFromCart: (id: number) => void;
  handleCloseCart?: VoidFunction;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart, handleCloseCart }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [completeOrder, { isLoading, isError, error }] = useCompleteOrderMutation();

  const handleOrder = () => {
    completeOrder(Number(user.id)).unwrap().then(() => {
      handleCloseCart?.();
      dispatch(updateAccountBalance(-calculateTotal(cartItems).toFixed(2)))
    })
  }

  const calculateTotal = (items: ICartItem[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <div className={styles.wrapper}>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      {Number(calculateTotal(cartItems).toFixed(2)) > 0
        && Number(calculateTotal(cartItems).toFixed(2)) <= user.bill &&
        <Button onClick={handleOrder}>Complete order</Button>
      }
    </div>
  );
};

export default Cart;