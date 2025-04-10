package com.trungtangiasu.server.service;

import com.trungtangiasu.server.models.Ward;
import com.trungtangiasu.server.repository.WardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WardService {

    @Autowired
    private WardRepository wardRepository;

    public List<Ward> findWardsByDistrictId(String districtId) {
        return wardRepository.findByDistrictDistrictId(districtId);
    }
}
