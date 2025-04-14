package com.trungtangiasu.server.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.trungtangiasu.server.JDBCRepositories.TutorJdbcRepository;
import com.trungtangiasu.server.jdbc.dto.TutorDTO;

@Service
public class TutorService {

    private final TutorJdbcRepository tutorJdbcRepository;

    public TutorService(TutorJdbcRepository tutorJdbcRepository) {
        this.tutorJdbcRepository = tutorJdbcRepository;
    }

    public List<TutorDTO> getAllTutors() {
        return tutorJdbcRepository.getAllTutors();
    }
}
