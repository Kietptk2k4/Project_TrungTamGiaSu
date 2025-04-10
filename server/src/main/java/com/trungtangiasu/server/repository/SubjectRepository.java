package com.trungtangiasu.server.repository;

import com.trungtangiasu.server.models.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subject, Integer> {
    Subject findBySubjectName(String subjectName);
}
