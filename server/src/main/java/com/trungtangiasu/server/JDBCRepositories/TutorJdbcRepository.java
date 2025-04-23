package com.trungtangiasu.server.JDBCRepositories;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.trungtangiasu.server.jdbc.dto.TutorDTO ;

@Repository
public class TutorJdbcRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    public List<TutorDTO> getAllTutors() {
        String sql = """
            SELECT 
                t.tutor_id,
                pi.full_name,
                pi.gender,
                t.avg_rating,
                t.completed_courses,
                t.introduction,
                s.subject_name,
                c.class_name
            FROM Tutors t
            JOIN Accounts a ON t.user_id = a.user_id
            JOIN PersonalInfos pi ON pi.user_id = a.user_id
            LEFT JOIN TutorSubjectClasses tsc ON t.tutor_id = tsc.tutor_id
            LEFT JOIN SubjectClassMappings scm ON scm.subject_class_id = tsc.subject_class_id
            LEFT JOIN Subjects s ON s.subject_id = scm.subject_id
            LEFT JOIN Classes c ON c.class_id = scm.class_id
            WHERE t.is_approved = true
            ORDER BY t.tutor_id
        """;

        return jdbcTemplate.query(sql, rs -> {
            Map<Integer, TutorDTO> tutorMap = new LinkedHashMap<>();

            while (rs.next()) {
                int tutorId = rs.getInt("tutor_id");
                TutorDTO tutor = tutorMap.get(tutorId);

                if (tutor == null) {
                    tutor = new TutorDTO();
                    tutor.setId(tutorId);
                    tutor.setName(rs.getString("full_name"));
                    tutor.setGender(rs.getString("gender"));
                    tutor.setAvgRating(rs.getDouble("avg_rating"));
                    tutor.setCompletedCourses(rs.getInt("completed_courses"));
                    tutor.setIntroduction(rs.getString("introduction"));
                    tutor.setSubjects(new LinkedHashMap<>());
                    tutorMap.put(tutorId, tutor);
                }

                String subject = rs.getString("subject_name");
                String clazz = rs.getString("class_name");
                if (subject != null && clazz != null) {
                    tutor.getSubjects()
                         .computeIfAbsent(subject, k -> new ArrayList<>())
                         .add(clazz);
                }
            }

            return new ArrayList<>(tutorMap.values());
        });
    }
}



 