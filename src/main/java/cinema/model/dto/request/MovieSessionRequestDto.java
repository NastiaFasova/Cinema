package cinema.model.dto.request;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class MovieSessionRequestDto {
    @NotNull(message = "MovieTitle can't be null")
    @Size(min = 1, max = 40)
    private String movieTitle;
    @NotNull(message = "CinemaHallId can't be null")
    private Long cinemaHallId;
    @NotNull(message = "ShowTime can't be null")
    private String showTime;

    public String getMovieTitle() {
        return movieTitle;
    }

    public Long getCinemaHallId() {
        return cinemaHallId;
    }

    public String getShowTime() {
        return showTime;
    }

}
