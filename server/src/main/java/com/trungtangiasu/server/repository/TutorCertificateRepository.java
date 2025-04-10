package com.trungtangiasu.server.repository;

import com.trungtangiasu.server.models.TutorCertificate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TutorCertificateRepository extends JpaRepository<TutorCertificate, Integer> {
    List<TutorCertificate> findByTutorTutorId(Integer tutorId);
}
