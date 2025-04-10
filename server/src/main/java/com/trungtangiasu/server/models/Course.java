package com.trungtangiasu.server.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "Course")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Integer courseId;

    @OneToOne
    @JoinColumn(name = "request_id", referencedColumnName = "request_id", nullable = false)
    private TutoringRequest request;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "ENUM('In Progress', 'Completed', 'Cancelled') DEFAULT 'In Progress'")
    private Status status;

    @Column(name = "sessions_per_week")
    private Integer sessionsPerWeek;

    public enum Status {
        InProgress, Completed, Cancelled
    }
}
