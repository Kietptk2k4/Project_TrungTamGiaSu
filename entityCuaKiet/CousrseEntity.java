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
@Table(name = "course")
public class CousrseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer course_id;
	
	@Column(name = "request_id", nullable = false)
	private Integer request_id;
	
	@Column(name = "sessions_per_week", nullable = false)
	private Integer sessions_per_week;
	
	@Column(name = "start_date", nullable = false)
	private LocalDateTime start_date;
	
	@Column(name = "end_date", nullable = false)
	private LocalDateTime end_date;
	
	@Column(name = "status", nullable = false)
	private String status;
	
	@OneToMany(mappedBy = "coursePayment",fetch = FetchType.LAZY )
	private List<CousrseEntity> coursePaymentList = new ArrayList<>();

	@OneToMany(mappedBy = "courseFeedback",fetch = FetchType.LAZY )
	private List<FeedBackEntity> courseFeedBackList = new ArrayList<>();

	@OneToMany(mappedBy = "courseOfSchedule",fetch = FetchType.LAZY )
	private List<CourseScheduleEntity> scheduleOfCourseList = new ArrayList<>();

	
	
}
