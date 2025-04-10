package com.trungtangiasu.server.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Province")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Province {
    @Id
    @Column(name = "province_id", length = 20)
    private String provinceId;

    @Column(name = "name", nullable = false, unique = true, length = 100)
    private String name;
}
