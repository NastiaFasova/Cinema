package cinema.model.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class CinemaHallDto {
    @NotNull(message = "CinemaHallId can't be null")
    private Long id;
    @NotNull(message = "Capacity of a cinemaHall can't be null")
    @Min(50)
    private int capacity;
    @Size(min = 10, max = 150)
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
