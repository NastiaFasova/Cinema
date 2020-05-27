package cinema.service.impl;

import cinema.dao.OrderDao;
import cinema.dao.TicketDao;
import cinema.lib.Inject;
import cinema.lib.Service;
import cinema.model.Order;
import cinema.model.Ticket;
import cinema.model.User;
import cinema.service.OrderService;
import cinema.service.ShoppingCartService;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Inject
    private OrderDao orderDao;

    @Inject
    private ShoppingCartService shoppingCartService;

    @Inject
    private TicketDao ticketDao;

    @Override
    public Order completeOrder(List<Ticket> tickets, User user) {
        Order order = new Order();
        order.setOrderDate(LocalDateTime.now());
        order.setTickets(tickets);
        order.setUser(user);
        orderDao.create(order);
        shoppingCartService.clear(shoppingCartService.getByUser(user));
        return order;
    }

    @Override
    public List<Order> getOrderHistory(User user) {
        return orderDao.getOrderHistory(user);
    }
}
