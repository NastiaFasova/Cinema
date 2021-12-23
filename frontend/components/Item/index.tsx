import { Button, Chip } from '@mui/material';
import { ICartItem, ICinemaSession } from '../../types';
import styles from './Item.module.scss';
import clsx from 'clsx';

type Props = {
  item: ICinemaSession;
  handleAddToCart: (clickedItem: ICartItem) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <div className={clsx(styles.wrapper)}>
    <div className={styles.wrapper__img}><img src={item.image} alt={item.title} /></div>
    <div className={styles.wrapper__mainContent}>
      <Chip label={item.showTime} color="primary" sx={{ height: 20, width: 110 }} />
      <h3>{item.movieTitle}</h3>
      <p>{item.description?.slice(0, 90) + '...'}</p>
      <h3>${item.price}</h3>
      <span>Tickets: {item.currentTicketCount}/{item.maxTicketCount}</span>
    </div>
    <Button onClick={() => handleAddToCart(item as any)}>Add to cart</Button>
  </div>
);

export default Item;