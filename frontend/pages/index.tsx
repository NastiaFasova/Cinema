import { Badge, Box, Drawer, Grid, LinearProgress } from '@mui/material'
import type { NextPage } from 'next'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Image from 'next/image'
import Cart from '../components/Cart'
import { useEffect, useState } from 'react';
import { ICartItem, IFilm } from '../types';
import Item from '../components/Item';
import Loader from '../components/Loader';
import { useAppSelector } from '../globalStore/hooks';
import { selectUser } from '../globalStore/slices/authSlice';

const Home: NextPage = () => {
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
      const filmsLinks = await getAPI('movies');
      const findedFilms = await Promise.all(filmsLinks.map((async (f: any) => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${f.apiId}`);
        return { ...data, id: f.apiId };
      })));
      setFilms(findedFilms);
      setLoading(false);
    })();

  }, []);

  if (loading) {
    return <Loader />;
  }

  const data: ICartItem[] = [{
    id: 1,
    category: "teee",
    description: "dsadasd",
    image: "dsad",
    price: 222,
    title: "dsadas",
    amount: 23,
  }];

  // if (isLoading) return <LinearProgress />;
  // if (error) return <div>Something went wrong ...</div>;

  return (
    <Box sx={{ margin: 40 }}>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <Box sx={{ position: 'fixed', zIndex: 100, right: 20, top: 20 }} onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </Box>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Box >
  )
}

export default Home
