package cinema.model.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
public class OrderResponseDto {
    private Long id;
    private List<Long> ticketsId = new ArrayList<>();
    private String orderDate;
    private Long userId;
}
