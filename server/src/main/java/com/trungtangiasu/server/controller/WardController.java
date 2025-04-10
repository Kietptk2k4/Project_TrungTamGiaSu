package com.trungtangiasu.server.controller;

import com.trungtangiasu.server.models.Ward;
import com.trungtangiasu.server.service.WardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wards")
public class WardController {

    @Autowired
    private WardService wardService;

    @GetMapping("/district/{districtId}")
    public ResponseEntity<List<Ward>> getWardsByDistrictId(@PathVariable String districtId) {
        return ResponseEntity.ok(wardService.findWardsByDistrictId(districtId));
    }
}
