package com.trungtangiasu.server.controller;

import com.trungtangiasu.server.models.PersonalInfo;
import com.trungtangiasu.server.service.PersonalInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/personal-info")
public class PersonalInfoController {

    @Autowired
    private PersonalInfoService personalInfoService;

    @GetMapping("/{personalInfoId}")
    public ResponseEntity<PersonalInfo> getPersonalInfoById(@PathVariable Integer personalInfoId) {
        Optional<PersonalInfo> personalInfo = personalInfoService.findPersonalInfoById(personalInfoId);
        return personalInfo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PersonalInfo> createPersonalInfo(@RequestBody PersonalInfo personalInfo) {
        return ResponseEntity.ok(personalInfoService.savePersonalInfo(personalInfo));
    }
}
