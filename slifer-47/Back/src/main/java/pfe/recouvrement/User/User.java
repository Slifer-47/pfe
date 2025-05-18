package pfe.recouvrement.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import pfe.recouvrement.role.Role;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="User")
@Entity
@EntityListeners(AuditingEntityListener.class)
public class User implements UserDetails, Principal {
    // Getters and Setters
    @Id
    @Column(nullable = false)
    private String idUser;

    @NotNull
    private int idStruct;
    @Column(nullable = false,name="nom")
    private String nom;
    @Column(nullable = false,name="prenom")
    private String prenom;
    @Column(nullable = false,name="password")
    private String password;
    private boolean accountLocked = false;
    private boolean enabled;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;
    @Column(unique = true)
    private String email;

    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(name="user_roles",joinColumns=@JoinColumn(name="users_id_user"),inverseJoinColumns=@JoinColumn(name="roles_id"))
    private List<Role>roles;
    @Override
    public String getName() {return nom+","+prenom;}

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream().map(r->new SimpleGrantedAuthority(r.getName())).collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    public String fullName(){
        return this.nom+" "+ this.prenom;
    }
}