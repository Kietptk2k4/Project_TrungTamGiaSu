package com.trungtangiasu.server.repository;

import com.trungtangiasu.server.models.Ward;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WardRepository extends JpaRepository<Ward, String> {
    List<Ward> findByDistrictDistrictId(String districtId);
}
