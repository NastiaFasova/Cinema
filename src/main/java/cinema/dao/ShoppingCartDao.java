package cinema.dao;

import cinema.model.ShoppingCart;
import cinema.model.User;
import java.util.Optional;

public interface ShoppingCartDao {
    ShoppingCart add(ShoppingCart shoppingCart);

    Optional<ShoppingCart> getByUser(User user);

    void update(ShoppingCart shoppingCart);
}
