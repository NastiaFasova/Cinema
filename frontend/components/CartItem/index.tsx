import { Button } from '@mui/material';
import { ICartItem } from '../../types';
import styles from './CartItem.module.scss';

type Props = {
  item: ICartItem;
  addToCart: (clickedItem: ICartItem) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
  <div>
    <div className={styles.wrapper}>
      <h3>{item.movieTitle}</h3>
      <div className={styles.information}>
        <p>Price: ${item.price}</p>
        <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
      </div>
      <div className={styles.buttons}>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => removeFromCart(item.id)}
        >
          -
        </Button>
        <p>{item.amount}</p>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => addToCart(item)}
        >
          +
        </Button>
      </div>
      <div className={styles.imageWrapper}><img src={item.image} alt={item.title} /></div>
    </div>
  </div>
);

export default CartItem;