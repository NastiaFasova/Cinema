package kpi.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Table(name="bills")
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    private Double amountOfMoney;
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Bill(Double amountOfMoney) {
        this.amountOfMoney = amountOfMoney;
    }
}
