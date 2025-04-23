package com.trungtangiasu.server.jdbc.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TutorDTO  {
        private int id;
        private String name;
        private String gender;
        private double avgRating;
        private int completedCourses;
        private String introduction;
        private Map<String, List<String>> subjects; // key = môn, value = danh sách lớp
    
}
    

    

