package kpi.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "movie")
@Data
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(unique = true)
    private String apiId;
    private String link;
}
