package com.trungtangiasu.server.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trungtangiasu.server.jdbc.dto.TutorDTO;
import com.trungtangiasu.server.jdbc.dto.reponse.APIReponse;
import com.trungtangiasu.server.services.TutorService;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/tutors")
public class TutorController {

    private final TutorService tutorService;

    public TutorController(TutorService tutorService) {
        this.tutorService = tutorService;
    }


    
    @GetMapping
    public ResponseEntity<APIReponse<List<TutorDTO>>> getAllTutors() {
        APIReponse<List<TutorDTO>> apiReponse = new APIReponse<>();
        apiReponse.setData(tutorService.getAllTutors());
        return ResponseEntity.ok(apiReponse);
    }

}
