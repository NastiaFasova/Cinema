package kpi.service.impl;

import kpi.repository.OrderRepository;
import kpi.models.Order;
import kpi.models.Ticket;
import kpi.models.User;
import kpi.service.OrderService;
import kpi.service.ShoppingCartService;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    private final ShoppingCartService shoppingCartService;

    public OrderServiceImpl(OrderRepository orderRepository, ShoppingCartService shoppingCartService) {
        this.orderRepository = orderRepository;
        this.shoppingCartService = shoppingCartService;
    }

    @Override
    public Order completeOrder(List<Ticket> tickets, User user) {
        Order order = new Order();
        order.setOrderDate(LocalDateTime.now());
        order.setTickets(tickets);
        order.setUser(user);
        orderRepository.save(order);
        shoppingCartService.clear(shoppingCartService.getByUser(user));
        return order;
    }

    @Override
    public List<Order> getOrderHistory(User user) {
        return orderRepository.getOrderHistory(user);
    }
}
