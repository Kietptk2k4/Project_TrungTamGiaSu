package Bin.Entity;

import javax.persistence.*;

import org.springframework.transaction.annotation.Transactional;

import lombok.*;
import java.time.LocalDateTime;
import java.util.*;

@Transactional
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "permission")
public class PermissionEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer permission_id;
	
	@Column(name = "permission_name", nullable = false, unique = true)
	private String permission_name;
	
	@Column(name = "discription", nullable = false)
	private String discription;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "permission_role",
	            joinColumns = @JoinColumn(name = "permission_id", nullable = false),
	            inverseJoinColumns = @JoinColumn(name = "role_id", nullable = false))
	    private List<RoleEntity> roleList = new ArrayList<>();
}
