import { Button } from '@mui/material';
import { ICartItem } from '../../types';
import styles from './Item.module.scss';

type Props = {
  item: ICartItem;
  handleAddToCart: (clickedItem: ICartItem) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <div className={styles.wrapper}>
    <div className={styles.wrapper__img}><img src={item.image} alt={item.title} /></div>
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <h3>${item.price}</h3>
    </div>
    <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
  </div>
);

export default Item;