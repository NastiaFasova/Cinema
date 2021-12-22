package kpi.models.dto.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserResponseDto {
    private Long id;
    private String email;
    private String firstname;
    private String lastname;
    private String avatarUrl;
}
