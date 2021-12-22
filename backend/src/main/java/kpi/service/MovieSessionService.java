package kpi.service;

import kpi.models.MovieSession;
import java.time.LocalDate;
import java.util.List;

public interface MovieSessionService {
    List<MovieSession> getAvailableSessions(Long movieId, LocalDate date);

    MovieSession add(MovieSession session);

    MovieSession add(MovieSession session, String id);

    MovieSession get(Long id);

    boolean deleteById(Long id);

    List<MovieSession> getAll();
}
