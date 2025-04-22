package com.trungtangiasu.server.JDBCRepositories;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class AuthRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Map<String, Object> findAccountByEmail(String email) {
        String sql = """
            SELECT a.user_id,  a.email, a.hashed_password, a.is_active, r.role_name
            FROM accounts a
            JOIN roles r ON a.role_id = r.role_id
            WHERE a.email = ?
            
        """;

        try {
            return jdbcTemplate.queryForMap(sql, email);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
}
