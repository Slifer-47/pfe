package pfe.recouvrement.auth;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationRequest {
    @NotEmpty(message="Username is mandatory")
    @NotBlank(message="Username is mandatory")
    private String IdUser;

    @Email(message = "Email is not well formatted")
    @NotEmpty(message = "Email is mandatory")
    @NotNull(message = "Email is mandatory")
    private String email;

    private int idStruct;

    @NotEmpty(message="Last name is mandatory")
    private String nom;

    @NotEmpty(message="First name is mandatory")
    private String prenom;

    @NotEmpty(message="Password is mandatory")
    @NotBlank(message="Password is mandatory")
    @Size(min=8, message="Password must be at least 8 characters long")
    private String password;
}