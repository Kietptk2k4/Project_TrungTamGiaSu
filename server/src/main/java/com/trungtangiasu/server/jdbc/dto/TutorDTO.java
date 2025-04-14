package com.trungtangiasu.server.jdbc.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TutorDTO  {
    private int id;
    private String name;
    private String gender;
    private double avg_rating;
    private int completed_courses;
    private String introduction;
    private List<String> subjects;
    private List<String> classes;
    public TutorDTO() {
    }
    public TutorDTO (int id, String name, Double avg_rating, Integer completed_courses, String introduction) {
        this.id = id;
        this.name = name;
        this.avg_rating = avg_rating;
        this.completed_courses = completed_courses;
        this.introduction = introduction;
    }

    
}
