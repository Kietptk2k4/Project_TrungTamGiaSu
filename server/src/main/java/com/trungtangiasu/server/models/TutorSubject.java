package com.trungtangiasu.server.models;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "TutorSubject")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TutorSubject {
    
    @Id
    @ManyToOne
    @JoinColumn(name = "tutorId", referencedColumnName = "tutorId", nullable = false)
    private Tutor tutor;
    
    @Id
    @ManyToOne
    @JoinColumn(name = "subjectId", referencedColumnName = "subjectId", nullable = false)
    private Subject subject;
    
    @Column(name = "level", length = 255, nullable = false)
    private String level;
}
