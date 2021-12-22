package kpi.service;

import kpi.models.CinemaHall;
import java.util.List;

public interface CinemaHallService {
    CinemaHall add(CinemaHall cinemaHall);

    CinemaHall add(CinemaHall cinemaHall, String id);

    List<CinemaHall> getAll();

    CinemaHall get(Long id);

    boolean deleteById(Long id);
}
