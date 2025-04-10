package com.trungtangiasu.server.models;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Tutor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tutor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tutor_id")
    private Integer tutorId;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private Account user;

    @OneToOne
    @JoinColumn(name = "personal_info_id", referencedColumnName = "personal_info_id", nullable = false)
    private PersonalInfo personalInfo;

    @Column(name = "introduction", columnDefinition = "TEXT")
    private String introduction;

    @Column(name = "avg_rating", precision = 10, scale = 2, columnDefinition = "DECIMAL(10,2) DEFAULT 0")
    private BigDecimal avgRating;

    @Column(name = "completed_courses", columnDefinition = "INT DEFAULT 0")
    private Integer completedCourses;

    @Column(name = "feedback_course_count", columnDefinition = "INT DEFAULT 0")
    private Integer feedbackCourseCount;

    @Column(name = "is_approved", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean isApproved;
}