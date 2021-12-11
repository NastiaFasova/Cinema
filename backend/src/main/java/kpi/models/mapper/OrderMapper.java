package kpi.models.mapper;

import kpi.models.Order;
import kpi.models.Ticket;
import kpi.models.dto.response.OrderResponseDto;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

@Component
public class OrderMapper {
    public OrderResponseDto getOrderResponseDto(Order order) {
        OrderResponseDto orderResponseDto = new OrderResponseDto();
        orderResponseDto.setId(order.getId());
        orderResponseDto.setOrderDate(order.getOrderDate().toString());
        orderResponseDto.setTicketsId(order.getTickets().stream()
                .map(Ticket::getId)
                .collect(Collectors.toList()));
        orderResponseDto.setUserId(order.getUser().getId());
        return orderResponseDto;
    }
}
