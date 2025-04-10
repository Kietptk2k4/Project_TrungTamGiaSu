package com.trungtangiasu.server.service;

import com.trungtangiasu.server.models.PersonalInfo;
import com.trungtangiasu.server.repository.PersonalInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PersonalInfoService {

    @Autowired
    private PersonalInfoRepository personalInfoRepository;

    public PersonalInfo savePersonalInfo(PersonalInfo personalInfo) {
        return personalInfoRepository.save(personalInfo);
    }

    public Optional<PersonalInfo> findPersonalInfoById(Integer personalInfoId) {
        return personalInfoRepository.findById(personalInfoId);
    }

    public void deletePersonalInfo(Integer personalInfoId) {
        personalInfoRepository.deleteById(personalInfoId);
    }
}
