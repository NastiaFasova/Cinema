package kpi.service;

import kpi.models.Order;
import kpi.models.Ticket;
import kpi.models.User;
import java.util.List;

public interface OrderService {
    Order completeOrder(List<Ticket> tickets, User user);

    List<Order> getOrderHistory(User user);
}
