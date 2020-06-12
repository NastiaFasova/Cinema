package cinema.model.dto.response;

import java.util.ArrayList;
import java.util.List;

public class ShoppingCartResponseDto {
    private Long id;
    private List<Long> ticketsId = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Long> getTicketsId() {
        return ticketsId;
    }

    public void setTicketsId(List<Long> ticketsId) {
        this.ticketsId = ticketsId;
    }
}
