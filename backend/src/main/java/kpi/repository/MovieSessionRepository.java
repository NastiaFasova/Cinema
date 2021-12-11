package kpi.repository;

import kpi.models.MovieSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MovieSessionRepository extends JpaRepository<MovieSession, Long> {
    @Query("from MovieSession ms JOIN FETCH ms.movie m JOIN FETCH ms.cinemaHall c "
            + "where m.id = :movieId "
            + "and ms.showTime > :dateStart "
            + "and ms.showTime < :dateEnd")
    List<MovieSession> getAvailableSessions(Long movieId, LocalDateTime dateStart, LocalDateTime dateEnd);
}
