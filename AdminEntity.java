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
@Table(name = "admin")
public class AdminEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer admin_id;
	
	@Column(name = "user_id", nullable = false)
	private Integer user_id;
	
	@Column(name = "name", nullable = false)
	private String name;
	
	@Column(name = "phone_number", nullable = false, unique = true)
	private String phone_number;
	
	@Column(name = "gender", nullable = false)
	private String gender;
	
	@OneToMany(mappedBy = "admin",fetch = FetchType.LAZY )
	private List<CancellationResponseEntity> cancellationResponseList = new ArrayList<>();

	
}
