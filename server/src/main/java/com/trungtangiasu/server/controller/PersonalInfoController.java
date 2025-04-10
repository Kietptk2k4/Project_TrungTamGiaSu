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

    // Tạo mới thông tin cá nhân
    @PostMapping
    public ResponseEntity<PersonalInfo> createPersonalInfo(@RequestBody PersonalInfo personalInfo) {
        return ResponseEntity.ok(personalInfoService.savePersonalInfo(personalInfo));
    }

    // Lấy thông tin cá nhân theo ID
    @GetMapping("/{personalInfoId}")
    public ResponseEntity<PersonalInfo> getPersonalInfoById(@PathVariable Integer personalInfoId) {
        Optional<PersonalInfo> personalInfo = personalInfoService.findPersonalInfoById(personalInfoId);
        return personalInfo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Cập nhật thông tin cá nhân
    @PutMapping("/{personalInfoId}")
    public ResponseEntity<PersonalInfo> updatePersonalInfo(
            @PathVariable Integer personalInfoId,
            @RequestBody PersonalInfo updatedPersonalInfo) {
        Optional<PersonalInfo> existingPersonalInfo = personalInfoService.findPersonalInfoById(personalInfoId);
        if (existingPersonalInfo.isPresent()) {
            PersonalInfo personalInfo = existingPersonalInfo.get();
            personalInfo.setName(updatedPersonalInfo.getName());
            personalInfo.setGender(updatedPersonalInfo.getGender());
            personalInfo.setPhoneNumber(updatedPersonalInfo.getPhoneNumber());
            return ResponseEntity.ok(personalInfoService.savePersonalInfo(personalInfo));
        }
        return ResponseEntity.notFound().build();
    }

    // Xóa thông tin cá nhân
    @DeleteMapping("/{personalInfoId}")
    public ResponseEntity<Void> deletePersonalInfo(@PathVariable Integer personalInfoId) {
        personalInfoService.deletePersonalInfo(personalInfoId);
        return ResponseEntity.noContent().build();
    }
}