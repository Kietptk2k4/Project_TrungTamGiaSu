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
@Table(name = "course_schedule")
public class CourseScheduleEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer chedule_id;

	@Column(name = "day_of_week", nullable = false)
	private Integer day_of_week;
	
	@Column(name = "start_time", nullable = false)
	private LocalTime start_time;
	
	@Column(name = "end_time", nullable = false)
	private LocalTime end_time;
	
	@ManyToOne
	@JoinColumn(name="course_id", nullable = false)
	private CousrseEntity courseOfSchedule;
	
}
