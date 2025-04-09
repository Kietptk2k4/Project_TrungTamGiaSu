package Bin.Entity;
import javax.persistence.*;
import org.springframework.transaction.annotation.Transactional;
import lombok.*;
import java.time.*;
import java.util.*;
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tutor_certificate")
public class TutorCertificateEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer certificate_id;
	
	@Column(name = "certificate_name", nullable = false)
	private String certificate_name;
	
	@Column(name = "issuing_authority", nullable = false)
	private String issuing_authority;

	@Column(name = "issue_date", nullable = false)
	private LocalDateTime issue_date;
	
	@ManyToOne
	@JoinColumn(name="tutor_id", nullable = false)
	private TutorEntity tutorOfCertificate;
}
