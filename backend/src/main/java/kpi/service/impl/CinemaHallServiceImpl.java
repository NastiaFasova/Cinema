package kpi.service.impl;

import kpi.repository.CinemaHallRepository;
import kpi.models.CinemaHall;
import kpi.service.CinemaHallService;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class CinemaHallServiceImpl implements CinemaHallService {

    private final CinemaHallRepository cinemaHallRepository;

    public CinemaHallServiceImpl(CinemaHallRepository cinemaHallRepository) {
        this.cinemaHallRepository = cinemaHallRepository;
    }

    @Override
    public CinemaHall add(CinemaHall cinemaHall) {
        return cinemaHallRepository.save(cinemaHall);
    }

    @Override
    public List<CinemaHall> getAll() {
        return cinemaHallRepository.findAll();
    }

    @Override
    public CinemaHall get(Long id) {
        return cinemaHallRepository.findById(id).orElseThrow();
    }
}
