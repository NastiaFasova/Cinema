package cinema.model.dto.request;

import cinema.validation.EmailValidation;
import cinema.validation.PasswordMatch;
import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.Size;

@Setter
@Getter
@PasswordMatch()
public class UserRequestDto {
    @EmailValidation
    private String email;
    @Size(min = 6)
    private String password;
    @Size(min = 6)
    private String repeatPassword;
}
