package cinema.model.dto.request;

import cinema.validation.EmailValidation;
import cinema.validation.PasswordMatch;
import javax.validation.constraints.Size;

@PasswordMatch
public class UserRequestDto {
    @EmailValidation
    private String email;
    @Size(min = 6)
    private String password;
    @Size(min = 6)
    private String repeatPassword;

    public String getRepeatPassword() {
        return repeatPassword;
    }

    public void setRepeatPassword(String repeatPassword) {
        this.repeatPassword = repeatPassword;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
