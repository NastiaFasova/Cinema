package kpi.service;

import kpi.models.Movie;
import org.springframework.data.domain.Page;

import java.util.List;

public interface MovieService {
    Movie add(Movie movie);

    Movie add(Movie movie, String id);

    List<Movie> getAll();

    Movie get(Long id);

    Movie getByTitle(String title);

    boolean deleteById(Long id);

    Movie getByApiId(String apiId);

    Page<Movie> findAllPaginated(String keyword, int page, int size, String sortField, String sortDir);
}
