package com.trungtangiasu.server.controller;

import org.springframework.web.bind.annotation.RestController;

import com.trungtangiasu.server.jdbc.model.District;
import com.trungtangiasu.server.jdbc.model.Province;
import com.trungtangiasu.server.jdbc.model.Ward;
import com.trungtangiasu.server.services.AddressService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/address")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }
    
    @GetMapping("/getAllProvinces")
    public ResponseEntity<List<Province>> getAllProvinces() {      
       List<Province> provinces = addressService.getAllProvinces();
        return ResponseEntity.ok(provinces);
    }
    @GetMapping("/getAllDistricts")
    public ResponseEntity<List<District>> getAllDistricts() {         
        List<District> districts = addressService.getAllDistricts();
        return ResponseEntity.ok(districts);
    }
    @GetMapping("/getAllWards")
    public ResponseEntity<List<Ward>> getAllWards() {        
        List<Ward> wards = addressService.getAllWards();
        return ResponseEntity.ok(wards);
    }
}
