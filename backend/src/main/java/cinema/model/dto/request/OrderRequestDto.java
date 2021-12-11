package cinema.model.dto.request;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class OrderRequestDto {
    @NotNull(message = "OrderId can't be null")
    private Long userId;

}
