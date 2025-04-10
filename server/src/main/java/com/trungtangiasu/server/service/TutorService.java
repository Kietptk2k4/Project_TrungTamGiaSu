package com.trungtangiasu.server.service;

import com.trungtangiasu.server.models.Tutor;
import com.trungtangiasu.server.repository.TutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TutorService {

    @Autowired
    private TutorRepository tutorRepository;

    public Tutor saveTutor(Tutor tutor) {
        return tutorRepository.save(tutor);
    }

    public Optional<Tutor> findTutorById(Integer tutorId) {
        return tutorRepository.findById(tutorId);
    }

    public void deleteTutor(Integer tutorId) {
        tutorRepository.deleteById(tutorId);
    }
}
