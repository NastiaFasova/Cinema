package cinema.model.dto.response;

import java.util.ArrayList;
import java.util.List;

public class OrderResponseDto {
    private Long id;
    private List<Long> ticketsId = new ArrayList<>();
    private String orderDate;
    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTicketsId(List<Long> ticketsId) {
        this.ticketsId = ticketsId;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
