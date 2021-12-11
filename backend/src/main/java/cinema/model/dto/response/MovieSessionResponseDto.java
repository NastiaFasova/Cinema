package cinema.model.dto.response;

import lombok.Setter;

@Setter
public class MovieSessionResponseDto {
    private Long movieSessionId;
    private String movieTitle;
    private Long cinemaHallId;
    private String showTime;
}
