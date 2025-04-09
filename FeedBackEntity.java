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
@Table(name = "feedback")
public class FeedBackEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer feedback_id;
	
	@Column(name = "rating", nullable = false)
	private Integer rating;

	@Column(name = "created_at", nullable = false)
	private LocalDateTime created_at;
	
	@Column(name = "content", nullable = false)
	private String content;

	@ManyToOne
	@JoinColumn(name="course_id", nullable = false)
	private CousrseEntity courseFeedBack;
}
