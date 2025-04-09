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
@Table(name = "cancellation_response")
public class CancellationResponseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer cancellation_response_id;

	@Column(name = "cancellation_request_id", nullable = false)
	private Integer cancellation_request_id;
	
	@Column(name = "admin_id", nullable = false)
	private Integer admin_id;
	
	@Column(name = "is_approved", nullable = false)
	private Integer is_approved;

	@Column(name = "reason", nullable = false)
	private String reason;
	
	@Column(name = "refund_deposite", nullable = false)
	private Float refund_deposite;

	@Column(name = "refund_tuition", nullable = false)
	private Float refund_tuition;

	@Column(name = "created_at", nullable = false)
	private LocalDateTime created_at;
	
	@ManyToOne
	@JoinColumn(name="admin_role", nullable=false)
	private AdminEntity admin;
}
