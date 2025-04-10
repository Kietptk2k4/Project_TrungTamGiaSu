package com.trungtangiasu.server.controller;

import com.trungtangiasu.server.models.District;
import com.trungtangiasu.server.service.DistrictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/districts")
public class DistrictController {

    @Autowired
    private DistrictService districtService;

    @GetMapping("/province/{provinceId}")
    public ResponseEntity<List<District>> getDistrictsByProvinceId(@PathVariable String provinceId) {
        return ResponseEntity.ok(districtService.findDistrictsByProvinceId(provinceId));
    }
}
