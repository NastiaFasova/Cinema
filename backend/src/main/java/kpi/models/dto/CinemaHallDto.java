package kpi.models.dto;

import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class CinemaHallDto {
    @NotNull(message = "CinemaHallId can't be null")
    private Long id;
    @NotNull(message = "Capacity of a cinemaHall can't be null")
    @Min(50)
    private int capacity;
    @Size(min = 10, max = 150)
    private String description;
    @Size(min = 1, max = 100)
    private String title;
}
