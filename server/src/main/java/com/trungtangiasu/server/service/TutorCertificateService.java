package com.trungtangiasu.server.service;

import com.trungtangiasu.server.models.TutorCertificate;
import com.trungtangiasu.server.repository.TutorCertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TutorCertificateService {

    @Autowired
    private TutorCertificateRepository tutorCertificateRepository;

    public TutorCertificate saveTutorCertificate(TutorCertificate certificate) {
        return tutorCertificateRepository.save(certificate);
    }

    public List<TutorCertificate> findCertificatesByTutorId(Integer tutorId) {
        return tutorCertificateRepository.findByTutorTutorId(tutorId);
    }

    public Optional<TutorCertificate> findCertificateById(Integer certificateId) {
        return tutorCertificateRepository.findById(certificateId);
    }

    public void deleteTutorCertificate(Integer certificateId) {
        tutorCertificateRepository.deleteById(certificateId);
    }
}
