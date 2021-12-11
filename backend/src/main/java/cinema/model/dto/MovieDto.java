package cinema.model.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class MovieDto {
    @NotNull(message = "MovieId can't be null")
    private Long id;
    @NotNull(message = "MovieTitle can't be null")
    @Size(min = 1, max = 40)
    private String title;
    @Size(min = 20, max = 200)
    private String description;
}
