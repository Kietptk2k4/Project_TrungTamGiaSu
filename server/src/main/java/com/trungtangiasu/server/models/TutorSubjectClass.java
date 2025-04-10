package com.trungtangiasu.server.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Tutor_Subject_Class")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TutorSubjectClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "tutor_id", referencedColumnName = "tutor_id", nullable = false)
    private Tutor tutor;

    @ManyToOne
    @JoinColumn(name = "subject_class_id", referencedColumnName = "subject_class_id", nullable = false)
    private SubjectClassMapping subjectClassMapping;
}
