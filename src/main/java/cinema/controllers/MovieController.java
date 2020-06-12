package cinema.controllers;

import cinema.model.Movie;
import cinema.model.dto.MovieDto;
import cinema.model.mapper.MovieMapper;
import cinema.service.MovieService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/movies")
public class MovieController {

    private final MovieService movieService;
    private final MovieMapper movieMapper;

    public MovieController(MovieService movieService, MovieMapper movieMapper) {
        this.movieService = movieService;
        this.movieMapper = movieMapper;
    }

    @PostMapping
    public void add(@RequestBody MovieDto movieRequestDto) {
        movieService.add(movieMapper.getMovie(movieRequestDto));
    }

    @GetMapping
    public List<MovieDto> getAll() {
        List<Movie> movies = movieService.getAll();
        return movies.stream()
                .map(movieMapper::getMovieResponseDto)
                .collect(Collectors.toList());
    }
}
