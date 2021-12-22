package kpi.models;

import lombok.Data;

import java.util.Set;
import javax.persistence.*;

@Entity
@Table(name = "user")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToMany
    private Set<Role> roles;
    @Column(unique = true)
    private String email;
    private String password;
    private String firstname;
    private String lastname;
    private String avatarUrl;
    @OneToOne(cascade =  CascadeType.ALL,
            mappedBy = "user")
    private Bill bill;
    private boolean blocked;
}
