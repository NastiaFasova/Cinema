import { Badge, Box, Container, Drawer, Grid, LinearProgress, Slider, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Cart from '../Cart'
import { FC, useEffect, useMemo, useState } from 'react';
import { ICartItem, IFilm } from '../../types';
import Item from '../Item';
import Loader from '../Loader';
import { useAppSelector } from '../../globalStore/hooks';
import { selectUser } from '../../globalStore/slices/authSlice';
import { getAPI } from '../../utils/fetchData';
import { getMinMaxByField } from '../../utils/getMinMaxByField';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';

const data: ICartItem[] = [{
  id: 1,
  category: "specific",
  description: "This is a description of a film",
  image: "https://m.media-amazon.com/images/M/MV5BMDI5ZWJhOWItYTlhOC00YWNhLTlkNzctNDU5YTI1M2E1MWZhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
  price: 25,
  title: "Title",
  amount: 33,
},
{
  id: 2,
  category: "specific",
  description: "This is a description of a film",
  image: "https://m.media-amazon.com/images/M/MV5BMDI5ZWJhOWItYTlhOC00YWNhLTlkNzctNDU5YTI1M2E1MWZhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
  price: 155,
  title: "Title",
  amount: 25,
},
{
  id: 3,
  category: "specific",
  description: "This is a description of a film",
  image: "https://m.media-amazon.com/images/M/MV5BMDI5ZWJhOWItYTlhOC00YWNhLTlkNzctNDU5YTI1M2E1MWZhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
  price: 5,
  title: "Title",
  amount: 5,
},
{
  id: 4,
  category: "specific",
  description: "This is a description of a film",
  image: "https://m.media-amazon.com/images/M/MV5BMDI5ZWJhOWItYTlhOC00YWNhLTlkNzctNDU5YTI1M2E1MWZhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
  price: 33,
  title: "Title",
  amount: 2,
}
];

const Sessions: FC = () => {
  const [sessions, setSessions] = useState(data);
  const priceMinMax = getMinMaxByField(data, 'price');
  const amountMinMax = getMinMaxByField(data, 'amount');

  const [currentPrice, setCurrentPrice] = useState<number>(priceMinMax[1]);
  const [currentAmount, setCurrentAmount] = useState<number>(amountMinMax[1]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as ICartItem[]);
  const [loading, setLoading] = useState(false);
  const [films, setFilms] = useState<IFilm[]>([]);
  const user = useAppSelector(selectUser);

  const getTotalItems = (items: ICartItem[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: ICartItem) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as ICartItem[])
    );
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      const sessions = await getAPI('movie-sessions');
      // setFilms(sessions);
      setLoading(false);
    })();

  }, []);

  const handleFilters = () => {
    setSessions(data.filter((s) => s.price <= currentPrice && s.amount <= currentAmount))
  }

  if (loading) {
    return <Loader />;
  }

  // if (isLoading) return <LinearProgress />;
  // if (error) return <div>Something went wrong ...</div>;

  return (
    <Container>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      {user.role === 'USER' &&
        <Box
          sx={{ position: 'fixed', zIndex: 100, right: 20, top: 20, display: 'flex', flexDirection: 'column' }}
        >
          <Badge badgeContent={getTotalItems(cartItems)} color='error' onClick={() => setCartOpen(true)}>
            <AddShoppingCartIcon />
          </Badge>
          <Box mt={2}>
            <Link href={`/profile/${user.id}`}>
              <a>
                <PersonIcon />
              </a>
            </Link>
          </Box>
        </Box>}
      <Box display="flex">
        <Box width={300}>
          <Typography variant="subtitle1">By price: </Typography>
          <Slider
            min={priceMinMax[0]}
            max={priceMinMax[1]}
            size="small"
            value={currentPrice}
            aria-label="Small"
            valueLabelDisplay="auto"
            onChange={(e: Event, v: number | Array<number>, aT: number) => setCurrentPrice(v as number)}
            onChangeCommitted={handleFilters}
          />
        </Box>
        <Box width={300} ml={5}>
          <Typography variant="subtitle1">By count: </Typography>
          <Slider
            min={amountMinMax[0]}
            max={amountMinMax[1]}
            size="small"
            defaultValue={currentAmount}
            onChange={(e: Event, v: number | Array<number>, aT: number) => setCurrentAmount(v as number)}
            onChangeCommitted={handleFilters}
            aria-label="Small"
            valueLabelDisplay="auto"
          />
        </Box>
      </Box>
      <Grid container spacing={3}>
        {sessions?.map(item => (
          <Grid item key={item.id} xs={3}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Sessions
