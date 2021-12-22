package kpi.models.dto.request;

import kpi.validation.EmailValidation;
import kpi.validation.PasswordMatch;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Size;

@Setter
@Getter
@PasswordMatch()
public class UserRegistrationDto {
    @EmailValidation
    private String email;
    @Size(min = 6)
    private String password;
    @Size(min = 6)
    private String repeatPassword;
    private String firstname;
    private String lastname;
    private String avatarUrl;

}
