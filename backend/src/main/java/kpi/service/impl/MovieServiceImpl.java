package kpi.service.impl;

import io.jsonwebtoken.lang.Assert;
import kpi.repository.MovieRepository;
import kpi.models.Movie;
import kpi.service.MovieService;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;

    public MovieServiceImpl(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @Override
    public Movie add(Movie movie) {
        return movieRepository.save(movie);
    }

    @Override
    public Movie add(Movie movie, String id) {
        Movie current = get(Long.parseLong(id));
        current.setTitle(movie.getTitle());
        current.setLink(movie.getLink());
        current.setApiId(movie.getApiId());
        return movieRepository.save(current);
    }

    @Override
    public Movie get(Long id) {
        return movieRepository.findById(id).orElseThrow();
    }

    @Override
    public List<Movie> getAll() {
        return movieRepository.findAll();
    }

    @Override
    public Movie getByTitle(String title) {
        return movieRepository.findByTitle(title);
    }

    @Override
    public Movie getByApiId(String apiId) {
        return movieRepository.findByApiId(apiId);
    }

    @Override
    public Page<Movie> findAllPaginated(String keyword, int page, int size, String sortField, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortField).ascending() :
                Sort.by(sortField).descending();
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        if (keyword == null) {
            return movieRepository.findAll(pageable);
        }
        return movieRepository.findAllByTitleContaining(keyword, pageable);
    }

    @Override
    public boolean deleteById(Long id) {
        movieRepository.deleteById(id);
        return true;
    }
}
