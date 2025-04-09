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
@Table(name = "cancellation_request")
public class CancellationRequestEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer cancellation_request_id;
	
	@Column(name = "reason", nullable = false)
	private String reason;
	
	@Column(name = "created_at", nullable = false)
	private LocalDateTime created_at;
	
	@Column(name = "requester_type", nullable = false)
	private String requester_type;
	
	@ManyToOne
	@JoinColumn(name="course_id", nullable=false)
	private AdminEntity course;
	

}
