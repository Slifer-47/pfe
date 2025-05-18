package pfe.recouvrement.auth;

import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthenticationRequest {
    @Email(message = "Email is not well formatted")
    @NotEmpty(message = "Email is mandatory")
    @NotNull(message = "Email is mandatory")
    private String email;

    @NotEmpty(message="password is mandatory")
    @NotBlank(message="password is mandatory")
    @Size(min=8,message="password must be at least 8 characters long")
    private String password;
}
