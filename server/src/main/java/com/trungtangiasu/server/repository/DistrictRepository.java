package com.trungtangiasu.server.repository;

import com.trungtangiasu.server.models.District;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DistrictRepository extends JpaRepository<District, String> {
    List<District> findByProvinceProvinceId(String provinceId);
}
