package kpi.controllers;

import kpi.exception.DuplicateFilmException;
import kpi.models.Movie;
import kpi.models.dto.MovieDto;
import kpi.models.mapper.MovieMapper;
import kpi.service.MovieService;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/movies")
public class MovieController {

    private final MovieService movieService;
    private final MovieMapper movieMapper;

    public MovieController(MovieService movieService, MovieMapper movieMapper) {
        this.movieService = movieService;
        this.movieMapper = movieMapper;
    }

    @PostMapping
    public Movie add(@RequestBody @Validated MovieDto movieRequestDto) {
        if (movieService.getByApiId(movieRequestDto.getApiId()) != null) {
            throw new DuplicateFilmException("This film is already in database");
        }
        return movieService.add(movieMapper.getMovie(movieRequestDto));
    }

    @PatchMapping("/{id}")
    public Movie update(@RequestBody @Validated MovieDto movieDto, @PathVariable("id") String id) {
        return movieService.add(movieMapper.getMovie(movieDto), id);
    }

    @GetMapping
    public List<Movie> viewMovies(@RequestParam(required = false) String keyword,
                            @RequestParam(defaultValue = "1") int page,
                            @RequestParam(defaultValue = "7") int size,
                            @RequestParam(value = "sortField", defaultValue = "title") String sortField,
                            @RequestParam(value = "sortDir", defaultValue = "asc") String sortDir) {
        Page<Movie> pageTuts = movieService.findAllPaginated(keyword, page, size, sortField, sortDir);
        return pageTuts.getContent();
    }

    @DeleteMapping("/{id}")
    public boolean deleteById(@PathVariable Long id) {
        return movieService.deleteById(id);
    }
}
