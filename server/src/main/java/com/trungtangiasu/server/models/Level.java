package com.trungtangiasu.server.models;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Levels")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Level {
    
    @Id
    @Column(name = "levelId", nullable = false)
    private Integer levelId;
    
    @Column(name = "description", length = 255, nullable = false)
    private String description;
}