package kpi.service;

import kpi.models.Movie;
import java.util.List;

public interface MovieService {
    Movie add(Movie movie);

    List<Movie> getAll();

    Movie getByTitle(String title);
}
