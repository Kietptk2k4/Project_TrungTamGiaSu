package com.trungtangiasu.server.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Class")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Class {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_id")
    private Integer classId;

    @Column(name = "class_name", nullable = false, unique = true, length = 100)
    private String className;
}