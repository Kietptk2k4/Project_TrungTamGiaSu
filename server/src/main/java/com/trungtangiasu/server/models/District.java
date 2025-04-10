package com.trungtangiasu.server.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "District")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class District {

    @Id
    @Column(name = "district_id", length = 20)
    private String districtId;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @ManyToOne
    @JoinColumn(name = "province_id", referencedColumnName = "province_id", nullable = false)
    private Province province;
}
