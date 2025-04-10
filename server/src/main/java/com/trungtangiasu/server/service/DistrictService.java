package com.trungtangiasu.server.service;

import com.trungtangiasu.server.models.District;
import com.trungtangiasu.server.repository.DistrictRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DistrictService {

    @Autowired
    private DistrictRepository districtRepository;

    public List<District> findDistrictsByProvinceId(String provinceId) {
        return districtRepository.findByProvinceProvinceId(provinceId);
    }
}
