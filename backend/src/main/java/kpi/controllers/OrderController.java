package kpi.controllers;

import kpi.models.Order;
import kpi.models.ShoppingCart;
import kpi.models.User;
import kpi.models.dto.request.OrderRequestDto;
import kpi.models.dto.response.OrderResponseDto;
import kpi.models.mapper.OrderMapper;
import kpi.service.OrderService;
import kpi.service.ShoppingCartService;
import kpi.service.UserService;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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
    public void complete(@RequestBody @Valid OrderRequestDto orderRequestDto) {
        User user = userService.get(orderRequestDto.getUserId());
        ShoppingCart shoppingCart = shoppingCartService.getByUser(user);
        orderService.completeOrder(shoppingCart.getTickets(), user);
    }

    @GetMapping
    public List<OrderResponseDto> getAll(Authentication authentication) {
        User user = userService.getByEmail(authentication.getName());
        List<Order> orders = orderService.getOrderHistory(user);
        return orders.stream()
                .map(orderMapper::getOrderResponseDto)
                .collect(Collectors.toList());
    }
}
