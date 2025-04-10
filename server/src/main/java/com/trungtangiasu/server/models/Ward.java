package com.trungtangiasu.server.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Ward")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ward {
    @Id
    @Column(name = "ward_id", length = 20)
    private String wardId;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @ManyToOne
    @JoinColumn(name = "district_id", referencedColumnName = "district_id", nullable = false)
    private District district;
}
