package Bin.Entity;
import javax.persistence.*;
import org.springframework.transaction.annotation.Transactional;

import lombok.*;
import java.time.LocalDateTime;
import java.util.*;
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "role")
public class RoleEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer role_id;
	
	@Column(name = "role_name", unique = true)
	private String role_name;

	@ManyToMany(mappedBy = "roleList", fetch = FetchType.LAZY)
	private List<PermissionEntity> permissionList = new ArrayList<>();
	
	@OneToMany(mappedBy = "role",fetch =FetchType.LAZY )
	private List<AccountEntity> accountList;
	
	
}
