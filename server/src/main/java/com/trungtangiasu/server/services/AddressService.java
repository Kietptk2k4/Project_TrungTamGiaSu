package com.trungtangiasu.server.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.trungtangiasu.server.JDBCRepositories.AddressRepository;
import com.trungtangiasu.server.jdbc.model.District;
import com.trungtangiasu.server.jdbc.model.Province;
import com.trungtangiasu.server.jdbc.model.Ward;

@Service
public class AddressService {

    private AddressRepository addressRepository;
    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public List<Province> getAllProvinces() {
        List<Province> provinces = addressRepository.getAllProvinces(); 
        return provinces;
    }

    public List<District> getAllDistricts() {
        List<District> districts = addressRepository.getAllDistricts(); 
        return districts;
    }
    public List<Ward> getAllWards() {
        List<Ward> wards = addressRepository.getAllWards(); 
        return wards;
    }
    public List<Ward> getWardsByDistrictId(int districtId) {
        List<Ward> wards = addressRepository.getAllWardsByDistrictId(districtId); 
        return wards;
    }
    public List<District> getDistrictsByProvinceId(int provinceId) {
        List<District> districts = addressRepository.getAllDistrictsByProvinceId(provinceId); 
        return districts;
    }

}
