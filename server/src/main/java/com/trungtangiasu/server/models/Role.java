package com.trungtangiasu.server.models;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Roles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Role {
    
    @Id
    @Column(name = "rolename", length = 50, nullable = false)
    private String rolename;
    
    @Column(name = "description", columnDefinition = "NCHAR", nullable = true)
    private String description;
}
