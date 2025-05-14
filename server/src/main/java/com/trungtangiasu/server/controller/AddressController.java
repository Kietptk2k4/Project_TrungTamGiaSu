package com.trungtangiasu.server.controller;

import org.springframework.web.bind.annotation.RestController;

import com.trungtangiasu.server.jdbc.dto.reponse.APIReponse;
import com.trungtangiasu.server.jdbc.model.District;
import com.trungtangiasu.server.jdbc.model.Province;
import com.trungtangiasu.server.jdbc.model.Ward;
import com.trungtangiasu.server.services.AddressService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/address")

@CrossOrigin(origins = "http://localhost:5173")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }
    
    @GetMapping("/getAllProvinces")
    public APIReponse<List<Province>> getAllProvinces() {    
        APIReponse<List<Province>> apiReponse = new APIReponse<>();
        apiReponse.setData(addressService.getAllProvinces());  
        return apiReponse;
    }
    @GetMapping("/getAllDistricts")
    public APIReponse<List<District>> getAllDistricts() {    
        APIReponse<List<District>> apiReponse = new APIReponse<>();
        apiReponse.setData(addressService.getAllDistricts());     
        // List<District> districts = addressService.getAllDistricts();
        return apiReponse;
    }
    @GetMapping("/getAllWards")
    public APIReponse<List<Ward>> getAllWards() {        
        APIReponse<List<Ward>> apiReponse = new APIReponse<>();
        apiReponse.setData(addressService.getAllWards());
        return apiReponse;

        // List<Ward> wards = addressService.getAllWards();
        // return ResponseEntity.ok(wards);
    }
}
