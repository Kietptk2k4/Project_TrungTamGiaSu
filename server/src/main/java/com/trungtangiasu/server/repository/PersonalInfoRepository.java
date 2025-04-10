package com.trungtangiasu.server.repository;

import com.trungtangiasu.server.models.PersonalInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonalInfoRepository extends JpaRepository<PersonalInfo, Integer> {
}
