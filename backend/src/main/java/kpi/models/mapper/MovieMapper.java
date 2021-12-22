package kpi.models.mapper;

import kpi.models.Movie;
import kpi.models.dto.MovieDto;
import org.springframework.stereotype.Component;

@Component
public class MovieMapper {
    public MovieDto getMovieResponseDto(Movie movie) {
        MovieDto movieDto = new MovieDto();
        movieDto.setTitle(movie.getTitle());
        movieDto.setId(movie.getId());
        movieDto.setApiId(movie.getApiId());
        movieDto.setLink(movie.getLink());
        return movieDto;
    }

    public Movie getMovie(MovieDto movieDto) {
        Movie movie = new Movie();
        movie.setTitle(movieDto.getTitle());
        movie.setLink(movieDto.getLink());
        movie.setApiId(movieDto.getApiId());
        return movie;
    }
}
