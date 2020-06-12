package cinema.controllers;

import cinema.model.Order;
import cinema.model.ShoppingCart;
import cinema.model.User;
import cinema.model.dto.request.OrderRequestDto;
import cinema.model.dto.response.OrderResponseDto;
import cinema.model.mapper.OrderMapper;
import cinema.service.OrderService;
import cinema.service.ShoppingCartService;
import cinema.service.UserService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;
    private final ShoppingCartService shoppingCartService;
    private final OrderMapper orderMapper;

    public OrderController(OrderService orderService, UserService userService,
                           ShoppingCartService shoppingCartService, OrderMapper orderMapper) {
        this.orderService = orderService;
        this.userService = userService;
        this.shoppingCartService = shoppingCartService;
        this.orderMapper = orderMapper;
    }

    @PostMapping("/complete")
    public void complete(@RequestBody OrderRequestDto orderRequestDto) {
        User user = userService.get(orderRequestDto.getUserId());
        ShoppingCart shoppingCart = shoppingCartService.getByUser(user);
        orderService.completeOrder(shoppingCart.getTickets(), user);
    }

    @GetMapping
    public List<OrderResponseDto> getAll(@RequestParam (name = "userId") Long userId) {
        User user = userService.get(userId);
        List<Order> orders = orderService.getOrderHistory(user);
        return orders.stream()
                .map(orderMapper::getOrderResponseDto)
                .collect(Collectors.toList());
    }
}
