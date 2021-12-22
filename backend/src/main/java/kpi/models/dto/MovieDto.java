package kpi.models.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class MovieDto {
    private Long id;
    @NotNull(message = "MovieTitle can't be null")
    @Size(min = 1, max = 40)
    private String title;
    private String apiId;
    private String link;
}
