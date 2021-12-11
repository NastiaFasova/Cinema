package kpi.controllers;

import kpi.models.CinemaHall;
import kpi.models.dto.CinemaHallDto;
import kpi.models.mapper.CinemaHallMapper;
import kpi.service.CinemaHallService;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;

import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/cinema-halls")
public class CinemaHallController {

    private final CinemaHallService cinemaHallService;
    private final CinemaHallMapper cinemaHallMapper;

    public CinemaHallController(CinemaHallService cinemaHallService,
                                CinemaHallMapper cinemaHallMapper) {
        this.cinemaHallService = cinemaHallService;
        this.cinemaHallMapper = cinemaHallMapper;
    }

    @PostMapping
    public void add(@RequestBody @Valid CinemaHallDto cinemaHallRequestDto) {
        cinemaHallService.add(cinemaHallMapper.getCinemaHall(cinemaHallRequestDto));
    }

    @GetMapping
    public List<CinemaHallDto> getAll() {
        List<CinemaHall> cinemaHalls = cinemaHallService.getAll();
        return cinemaHalls.stream()
                .map(cinemaHallMapper::getCinemaHallResponseDto)
                .collect(Collectors.toList());
    }
}

