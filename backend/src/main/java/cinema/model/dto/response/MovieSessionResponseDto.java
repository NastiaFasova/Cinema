package cinema.model.dto.response;

public class MovieSessionResponseDto {
    private Long movieSessionId;
    private String movieTitle;
    private Long cinemaHallId;
    private String showTime;

    public void setMovieSessionId(Long movieSessionId) {
        this.movieSessionId = movieSessionId;
    }

    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }

    public void setCinemaHallId(Long cinemaHallId) {
        this.cinemaHallId = cinemaHallId;
    }

    public void setShowTime(String showTime) {
        this.showTime = showTime;
    }
}
