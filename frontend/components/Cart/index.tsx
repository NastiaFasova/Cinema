import { ICartItem } from '../../types';
import CartItem from '../CartItem';
import styles from './Cart.module.scss';

type Props = {
  cartItems: ICartItem[];
  addToCart: (clickedItem: ICartItem) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
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
    </div>
  );
};

export default Cart;