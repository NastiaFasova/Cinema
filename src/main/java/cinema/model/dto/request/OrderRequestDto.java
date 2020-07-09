package cinema.model.dto.request;

import javax.validation.constraints.NotNull;

public class OrderRequestDto {
    @NotNull(message = "OrderId can't be null")
    private Long userId;

    public Long getUserId() {
        return userId;
    }

}
