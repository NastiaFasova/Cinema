package kpi.repository;

import kpi.models.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    Movie findByTitle(String title);

    Movie findByApiId(String apiId);

    Page<Movie> findAllByTitleContaining(String title, Pageable pageable);

    Movie getByApiId(String apiId);
}

