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
    public Map<String, Object> findCustomerIDByUserId(int user_id) {
        // SELECT a.user_id,  customer_id
        // FROM accounts a
        // JOIN customers c on a.user_id = c.user_id
        // WHERE a.user_id = ?;
        String sql = """
            SELECT a.user_id, c.customer_id, r.role_name
            FROM accounts a
            JOIN customers c ON a.user_id = c.user_id
            JOIN roles r ON a.role_id = r.role_id
            WHERE a.user_id = ?;
        """;

        try {
            return jdbcTemplate.queryForMap(sql, user_id);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
    public Map<String, Object> findTutorIDByUserId(int user_id) {
        // SELECT a.user_id,  t.tutor_id
        // FROM accounts a
        // JOIN tutors t on a.user_id = t.user_id
        // WHERE a.user_id = ?;
        String sql = """
            SELECT a.user_id, c.tutor_id, r.role_name
            FROM accounts a
            JOIN tutors t ON a.user_id = t.user_id
            JOIN roles r ON a.role_id = r.role_id
            WHERE a.user_id = ?;
        """;

        try {
            return jdbcTemplate.queryForMap(sql, user_id);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
    public Map<String, Object> findAdminIDByUserId(int user_id) {
        // SELECT a.user_id,  admin_id
        // FROM accounts a
        // JOIN admins ad on a.user_id = ad.user_id
        // WHERE a.user_id = ?;
        String sql = """
            SELECT a.user_id, ad.admin_id, r.role_name
            FROM accounts a
            JOIN admins ad ON a.user_id = ad.user_id
            JOIN roles r ON a.role_id = r.role_id
            WHERE a.user_id = ?;
        """;

        try {
            return jdbcTemplate.queryForMap(sql, user_id);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
}
