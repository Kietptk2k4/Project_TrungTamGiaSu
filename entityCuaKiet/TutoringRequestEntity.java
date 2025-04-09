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
@Table(name = "tutoring_request")

public class TutoringRequestEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer request_id;

	@JoinColumn(name="sessions_per_week", nullable = false)
	private Integer sessions_per_week;

	@JoinColumn(name="proposed_fee_per_session", nullable = false)
	private Float proposed_fee_per_session;
	
	@JoinColumn(name="address_detail", nullable = false)
	private String address_detail;

	@JoinColumn(name="created_at", nullable = false)
	private LocalDateTime created_at;
	
	@JoinColumn(name="expired_at", nullable = false)
	private LocalDateTime expired_at;
	
	@JoinColumn(name="status", nullable = false)
	private String status;
	
	
	
	@ManyToOne
	@JoinColumn(name="customer_id", nullable = false)
	private CustomerEntity customerTutoringRequest;
	
	@ManyToOne
	@JoinColumn(name="ward_id", nullable = false)
	private WardEntity wardOfRequest;
	
	@OneToMany(mappedBy = "tutoring_request_id",fetch = FetchType.LAZY )
	private List<RequestScheduleEntity> ScheduleOfRequestList = new ArrayList<>();
	
	@ManyToOne
	@JoinColumn(name="subject_class_mapping_id", nullable = false)
	private SubjectClassMappingEntity classOfRequest;

	@ManyToOne
	@JoinColumn(name="tutor_id", nullable = false)
	private TutorEntity tutorOfRequest;
}
