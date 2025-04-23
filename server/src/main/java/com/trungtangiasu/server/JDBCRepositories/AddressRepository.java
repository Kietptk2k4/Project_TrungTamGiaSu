package com.trungtangiasu.server.JDBCRepositories;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.trungtangiasu.server.configJDBC.ConDB;
import com.trungtangiasu.server.jdbc.model.District;
import com.trungtangiasu.server.jdbc.model.Province;
import com.trungtangiasu.server.jdbc.model.Ward;

@Repository
public class AddressRepository {
    private ConDB conDB;
    public AddressRepository() {
        conDB = new ConDB();
    }
    
    public List<Province>getAllProvinces(){
        String sql = "SELECT * FROM province";
        conDB = new ConDB();
        try (PreparedStatement preparedStatement = conDB.getConnection().prepareStatement(sql)) {
            List<Province> provinces = new ArrayList<>();
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Province province = Province.fromResultSet(resultSet);
                provinces.add(province);
            }
            return provinces;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            conDB.closeConnection();
        }
        return null;
    }

    public List<District> getAllDistricts() {
        String sql = """
            SELECT * FROM district 
            ORDER BY province_id,
             CAST(REGEXP_SUBSTR(name, '[0-9]+') AS UNSIGNED),
             name;
            """;
        conDB = new ConDB();
        try (PreparedStatement preparedStatement = conDB.getConnection().prepareStatement(sql)) {
            List<District> districts = new ArrayList<>();
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                District district = District.fromResultSet(resultSet);
                districts.add(district);
            }
            return districts;
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            conDB.closeConnection();
        }
        return null;
    }
    public List<Ward> getAllWards() {
        String sql = """
            SELECT * FROM ward 
            ORDER BY district_id,
                     CAST(REGEXP_SUBSTR(name, '[0-9]+') AS UNSIGNED),
                     name;
        """;
        
        conDB = new ConDB();
        try (PreparedStatement preparedStatement = conDB.getConnection().prepareStatement(sql)) {
            List<Ward> wards = new ArrayList<>();
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Ward ward = Ward.fromResultSet(resultSet);
                wards.add(ward);
            }
            return wards;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            conDB.closeConnection();
        }
        return null;
    }
    public List<Ward> getAllWardsByDistrictId(int districtId) {
        String sql = "SELECT * FROM ward WHERE district_id = ?";
        conDB = new ConDB();
        try (PreparedStatement preparedStatement = conDB.getConnection().prepareStatement(sql)) {
            preparedStatement.setInt(1, districtId);
            List<Ward> wards = new ArrayList<>();
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Ward ward = Ward.fromResultSet(resultSet);
                wards.add(ward);
            }
            return wards;
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            conDB.closeConnection();
        }
        return null;
    }

    public List<District> getAllDistrictsByProvinceId(int provinceId) {
        String sql = "SELECT * FROM district WHERE province_id = ?";
        conDB = new ConDB();
        try (PreparedStatement preparedStatement = conDB.getConnection().prepareStatement(sql)) {
            preparedStatement.setInt(1, provinceId);
            List<District> districts = new ArrayList<>();
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                District district = District.fromResultSet(resultSet);
                districts.add(district);
            }
            return districts;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            conDB.closeConnection();
        }
        return null;
    }
    
}
