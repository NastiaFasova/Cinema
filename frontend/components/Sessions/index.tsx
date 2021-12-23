import { Badge, Box, Container, Drawer, Grid, LinearProgress, Slider, TextField, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Cart from '../Cart'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ICartItem, IFilm } from '../../types';
import Item from '../Item';
import Loader from '../Loader';
import { useAppSelector } from '../../globalStore/hooks';
import { selectUser } from '../../globalStore/slices/authSlice';
import { getMinMaxByField } from '../../utils/getMinMaxByField';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useFetchAllMovieSessionsQuery } from '../../services/movie-session';
import { useAddToShoppingCartMutation, useFetchAllUserTicketsQuery, useRemoveFromShoppingCartMutation } from '../../services/shopping-cart';

const Sessions: FC = () => {
  const [addToCart, { isLoading: addToCartLoading }] = useAddToShoppingCartMutation();
  const [removeFromCart, { isLoading: removeFromCartLoading }] = useRemoveFromShoppingCartMutation();
  const { data: tickets, isLoading: isCartLoading, isError: isCartError } = useFetchAllUserTicketsQuery('');

  const { data = [], isLoading, isError } = useFetchAllMovieSessionsQuery('')
  const [sessions, setSessions] = useState(data);
  const priceMinMax = useMemo(() => data.length > 0 ? getMinMaxByField(data, 'price') : [0, 0], [data]);
  const maxTicketCountMinMax = useMemo(() => data.length > 0 ? getMinMaxByField(data, 'maxTicketCount') : [0, 0], [data]);
  const [currentPrice, setCurrentPrice] = useState<number>(priceMinMax[1]);
  const [currentMaxTicketCount, setCurrentMaxTicketCount] = useState<number>(maxTicketCountMinMax[1]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as ICartItem[]);
  const [selectDate, setSelectDate] = useState<Date | null>(null);
  const user = useAppSelector(selectUser);

  const getTotalItems = (items: ICartItem[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleRemoveFromCart = (id: number) => {

    removeFromCart({ id: tickets?.tickets.find(t => t.movieSessionId === id)?.id ?? 0, movieSessionId: id })
      .unwrap().then(() => {

        const updateSessionIdx = sessions.findIndex((s) => s.id === id);

        if (updateSessionIdx !== -1) {
          let newSessions = sessions.slice();
          newSessions[updateSessionIdx] =
          {
            ...newSessions[updateSessionIdx],
            currentTicketCount: newSessions[updateSessionIdx].currentTicketCount - 1
          };
          setSessions(newSessions);
        }

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
      })
  };

  const handleAddToCart = (clickedItem: ICartItem) => {
    addToCart(clickedItem.id).unwrap().then((tickets) => {
      const updateSessionIdx = sessions.findIndex((s) => s.id === clickedItem.id);

      if (updateSessionIdx !== -1) {
        let newSessions = sessions.slice();
        newSessions[updateSessionIdx] =
        {
          ...newSessions[updateSessionIdx],
          currentTicketCount: newSessions[updateSessionIdx].currentTicketCount + 1
        };
        setSessions(newSessions);
      }

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
        return [
          ...prev,
          {
            ...clickedItem,
            amount: tickets.tickets.filter((t) => t.movieSessionId === clickedItem.id).length
          }
        ];
      });

    });

  };

  const handleOpenCart = () => {
    setCartOpen(false);
  }

  const handleCloseCart = () => {
    setCartOpen(true);
  }

  useEffect(() => {
    if (data.length > 0) {
      setSessions(data);
    }
  }, [data])

  useEffect(() => {
    if (tickets && data.length > 0) {
      const uniqueSessions: Record<number, number> = {};

      tickets.tickets.forEach((t) => {
        uniqueSessions[t.movieSessionId] = uniqueSessions[t.movieSessionId] ? uniqueSessions[t.movieSessionId] + 1 : 1;
      });
      const items = Object.keys(uniqueSessions).map((sId) =>
        ({ ...data.find((s) => s.id === Number(sId)), amount: uniqueSessions[Number(sId)] }))

      setCartItems(items as ICartItem[]);
    }
  }, [data, tickets])

  const handleFilters = useCallback(() => {
    console.log('currentPrice', currentPrice);
    setSessions(data.filter((s) => {
      return Number(s.price) >= Number(currentPrice)
        && s.maxTicketCount >= currentMaxTicketCount
        && (selectDate ? selectDate.toISOString().slice(0, -14) === s.showTime : true);
    }))
  }, [currentMaxTicketCount, currentPrice, data, selectDate])

  useEffect(() => {
    if (selectDate) {
      handleFilters();
    }
  }, [handleFilters, selectDate]);

  if (isLoading && isCartLoading) {
    return <Loader />;
  }

  const handleChangeDate = (date: Date | null) => {
    if (!date) return;
    setSelectDate(date);
  };

  const handleDateDisabling = (day: any) => {
    if (data.map((itm) => new Date(itm.showTime).getMonth()).includes(day.getMonth()) &&
      data.map((itm) => new Date(itm.showTime).getDate()).includes(day.getDate()) &&
      data.map((itm) => new Date(itm.showTime).getFullYear()).includes(day.getFullYear())) {
      return false;
    }

    return true;
  }

  return (
    <Container>
      <Drawer anchor='right' open={cartOpen} onClose={handleOpenCart}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          handleCloseCart={handleCloseCart}
        />
      </Drawer>
      {user.role === 'USER' &&
        <Box
          sx={{ position: 'fixed', zIndex: 100, right: 20, top: 20, display: 'flex', flexDirection: 'column' }}
        >
          <Badge badgeContent={getTotalItems(cartItems) || tickets?.tickets.length} color='error' onClick={() => setCartOpen(true)}>
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
      <Box display="flex" justifyContent="space-around" mb={5}>
        <Box width={300}>
          <Typography variant="subtitle1">By price: </Typography>
          <Slider
            min={priceMinMax[0]}
            max={priceMinMax[1]}
            size="small"
            defaultValue={priceMinMax[0]}
            aria-label="Small"
            valueLabelDisplay="auto"
            onChange={(e: Event, v: number | Array<number>, aT: number) => setCurrentPrice(v as number)}
            onChangeCommitted={handleFilters}
          />
        </Box>
        <Box width={300} ml={5}>
          <Typography variant="subtitle1">By max tickets count: </Typography>
          <Slider
            min={maxTicketCountMinMax[0]}
            max={maxTicketCountMinMax[1]}
            size="small"
            defaultValue={maxTicketCountMinMax[0]}
            onChange={(e: Event, v: number | Array<number>, aT: number) => setCurrentMaxTicketCount(v as number)}
            onChangeCommitted={handleFilters}
            aria-label="Small"
            valueLabelDisplay="auto"
          />
        </Box>
        <Box width={300} ml={5}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Select Date"
              shouldDisableDate={handleDateDisabling}
              inputFormat="MM/dd/yyyy"
              value={selectDate}
              onChange={handleChangeDate}
              renderInput={(params: any) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      <Grid container spacing={3}>
        {sessions?.filter((s) => s.currentTicketCount < s.maxTicketCount).map(item => (
          <Grid item key={item.id} xs={3}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Sessions
