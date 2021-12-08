package cinema.model.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class MovieDto {
    @NotNull(message = "MovieId can't be null")
    private Long id;
    @NotNull(message = "MovieTitle can't be null")
    @Size(min = 1, max = 40)
    private String title;
    @Size(min = 20, max = 200)
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTitle(String title) {
        this.title = title;

    }
}
