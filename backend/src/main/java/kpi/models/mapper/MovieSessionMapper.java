package kpi.models.mapper;

import kpi.models.CinemaHall;
import kpi.models.Movie;
import kpi.models.MovieSession;
import kpi.models.dto.request.MovieSessionRequestDto;
import kpi.models.dto.response.MovieSessionResponseDto;
import kpi.service.CinemaHallService;
import kpi.service.MovieService;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Component;

@Component
public class MovieSessionMapper {
    private final CinemaHallService cinemaHallService;
    private final MovieService movieService;

    public MovieSessionMapper(CinemaHallService cinemaHallService, MovieService movieService) {
        this.cinemaHallService = cinemaHallService;
        this.movieService = movieService;
    }

    public MovieSessionResponseDto getMovieSessionResponseDto(MovieSession movieSession) {
        MovieSessionResponseDto movieSessionResponseDto = new MovieSessionResponseDto();
        movieSessionResponseDto.setMovieSessionId(movieSession.getId());
        movieSessionResponseDto.setMovieTitle(movieSession.getMovie().getTitle());
        movieSessionResponseDto.setMovieSessionId(movieSession.getId());
        movieSessionResponseDto.setCinemaHallId(movieSession.getCinemaHall().getId());
        movieSessionResponseDto.setShowTime(movieSession.getShowTime()
                .format(DateTimeFormatter.ISO_LOCAL_DATE));
        return movieSessionResponseDto;
    }

    public MovieSession getMovieSession(MovieSessionRequestDto movieSessionRequestDto) {
        MovieSession movieSession = new MovieSession();
        movieSession.setShowTime((LocalDateTime.parse(movieSessionRequestDto.getShowTime())));
        CinemaHall cinemaHall = cinemaHallService.get(movieSessionRequestDto.getCinemaHallId());
        movieSession.setCinemaHall(cinemaHall);
        Movie movie = movieService.getByTitle(movieSessionRequestDto.getMovieTitle());
        movieSession.setMovie(movie);
        return movieSession;
    }
}
