package kpi.service.impl;

import kpi.models.CinemaHall;
import kpi.repository.MovieSessionRepository;
import kpi.models.MovieSession;
import kpi.service.MovieSessionService;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class MovieSessionServiceImpl implements MovieSessionService {

    private final MovieSessionRepository movieSessionRepository;

    public MovieSessionServiceImpl(MovieSessionRepository movieSessionRepository) {
        this.movieSessionRepository = movieSessionRepository;
    }

    @Override
    public List<MovieSession> getAvailableSessions(Long movieId, LocalDate date) {
        return movieSessionRepository.getAvailableSessions(movieId, date.atStartOfDay(), date.atTime(LocalTime.MAX));
    }

    @Override
    public MovieSession add(MovieSession session) {
        return movieSessionRepository.save(session);
    }

    @Override
    public MovieSession add(MovieSession session, String id) {
        MovieSession current = get(Long.parseLong(id));
        current.setCurrentTicketCount(session.getCurrentTicketCount());
        current.setMovie(session.getMovie());
        current.setCinemaHall(session.getCinemaHall());
        current.setShowTime(session.getShowTime());
        current.setMaxTicketCount(session.getMaxTicketCount());
        return movieSessionRepository.save(current);
    }

    @Override
    public MovieSession get(Long id) {
        return movieSessionRepository.findById(id).orElseThrow();
    }

    @Override
    public boolean deleteById(Long id) {
        movieSessionRepository.deleteById(id);
        return true;
    }

    @Override
    public List<MovieSession> getAll() {
        return movieSessionRepository.findAll();
    }
}
