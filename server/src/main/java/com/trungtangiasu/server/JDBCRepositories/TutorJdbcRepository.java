package com.trungtangiasu.server.JDBCRepositories;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.trungtangiasu.server.jdbc.dto.TutorDTO ;

@Repository
public class TutorJdbcRepository {

    private final JdbcTemplate jdbcTemplate;

    public TutorJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<TutorDTO> getAllTutors() {
        String sql = """
            SELECT t.tutor_id, pi.full_name, pi.gender, t.avg_rating, t.completed_courses, t.introduction
            FROM Tutors t
            JOIN PersonalInfos pi ON t.user_id = pi.user_id
            WHERE t.is_approved = 1
        """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            TutorDTO tutor = new TutorDTO();
            int tutorId = rs.getInt("tutor_id");

            tutor.setId(tutorId);
            tutor.setName(rs.getString("full_name"));
            tutor.setGender(rs.getString("gender"));
            tutor.setAvg_rating(rs.getDouble("avg_rating"));
            tutor.setCompleted_courses(rs.getInt("completed_courses"));
            tutor.setIntroduction(rs.getString("introduction"));

            tutor.setSubjects(getSubjectsByTutorId(tutorId));
            tutor.setClasses(getClassesByTutorId(tutorId));
            return tutor;
        });
    }

    private List<String> getSubjectsByTutorId(int tutorId) {
        String sql = """
            SELECT DISTINCT s.subject_name
            FROM Subjects s
            JOIN SubjectClassMappings scm ON s.subject_id = scm.subject_id
            JOIN TutorSubjectClasses tsc ON scm.subject_class_id = tsc.subject_class_id
            WHERE tsc.tutor_id = ?
        """;
        return jdbcTemplate.query(sql, new Object[]{tutorId}, 
            (rs, rowNum) -> rs.getString("subject_name"));
    }
    

    private List<String> getClassesByTutorId(int tutorId) {
        String sql = """
            SELECT DISTINCT c.class_name
            FROM Classes c
            JOIN SubjectClassMappings scm ON c.class_id = scm.class_id
            JOIN TutorSubjectClasses tsc ON scm.subject_class_id = tsc.subject_class_id
            WHERE tsc.tutor_id = ?
        """;
        return jdbcTemplate.query(sql, new Object[]{tutorId}, 
            (rs, rowNum) -> rs.getString("class_name"));
    }
}
