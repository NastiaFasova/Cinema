package cinema.controllers;

import cinema.model.CinemaHall;
import cinema.model.dto.CinemaHallDto;
import cinema.model.mapper.CinemaHallMapper;
import cinema.service.CinemaHallService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public void add(@RequestBody CinemaHallDto cinemaHallRequestDto) {
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

