package kpi.service;

import kpi.models.MovieSession;
import kpi.models.ShoppingCart;
import kpi.models.User;

public interface ShoppingCartService {
    void addSession(MovieSession movieSession, User user);

    ShoppingCart getByUser(User user);

    void registerNewShoppingCart(User user);

    void clear(ShoppingCart shoppingCart);
}
