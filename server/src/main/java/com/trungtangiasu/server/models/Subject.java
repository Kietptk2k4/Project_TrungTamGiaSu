package com.trungtangiasu.server.models;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Subjects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Subject {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subjectId", nullable = false, length = 255)
    private String subjectId;
    
    @Column(name = "subjectName", nullable = false, length = 255)
    private String subjectName;
    
    @Column(name = "description", length = 500)
    private String description;
    
    @ManyToOne
    @JoinColumn(name = "level", referencedColumnName = "levelId", nullable = false)
    private Level level;
}
