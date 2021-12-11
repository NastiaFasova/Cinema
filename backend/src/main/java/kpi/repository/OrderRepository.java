package kpi.repository;

import kpi.models.Order;
import kpi.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("from Order o LEFT JOIN FETCH o.tickets t where o.user = :user")
    List<Order> getOrderHistory(User user);
}
