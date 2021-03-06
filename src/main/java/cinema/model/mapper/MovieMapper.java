package cinema.model.mapper;

import cinema.model.Movie;
import cinema.model.dto.MovieDto;
import org.springframework.stereotype.Component;

@Component
public class MovieMapper {
    public MovieDto getMovieResponseDto(Movie movie) {
        MovieDto movieDto = new MovieDto();
        movieDto.setTitle(movie.getTitle());
        movieDto.setId(movie.getId());
        movieDto.setDescription(movie.getDescription());
        return movieDto;
    }

    public Movie getMovie(MovieDto movieDto) {
        Movie movie = new Movie();
        movie.setTitle(movieDto.getTitle());
        movie.setDescription(movieDto.getDescription());
        return movie;
    }
}
