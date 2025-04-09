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
@Table(name = "tutor")
public class TutorEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer tutor_id;

	@Column(name = "user_id", nullable = false)
	private Integer user_id;
	
	@Column(name = "completed_courses", nullable = false)
	private Integer	completed_courses;
	
	@Column(name = "feedback_course_count", nullable = false)
	private Integer feedback_course_count;
	
	@Column(name = "name", nullable = false)
	private String name;
	
	@Column(name = "gender", nullable = false)
	private String	gender;
	
	@Column(name = "introduction", nullable = false)
	private String	introduction;
	
	@Column(name = "phone_number", nullable = false)
	private String	phone_number;
	
	@Column(name = "is_approved", nullable = false)
	private Boolean is_approved;
	
	@Column(name = "avg_rating", nullable = false)
	private Float avg_rating;
	
	@OneToMany(mappedBy = "TutorRequest",fetch = FetchType.LAZY )
	private List<TutoringRequestEntity> tutorRequestList = new ArrayList<>();

	@OneToMany(mappedBy = "tutorOfCertificate",fetch = FetchType.LAZY )
	private List<TutorCertificateEntity> certificateOfTutorList = new ArrayList<>();

	@ManyToMany(mappedBy = "tutorOfSubjectClassMappingList", fetch = FetchType.LAZY)
	private List<SubjectClassMappingEntity> subjectClassMappingOfTutorList = new ArrayList<>();

	@OneToMany(mappedBy = "tutorOfRequest",fetch = FetchType.LAZY )
	private List<TutoringRequestEntity> requestOfTutorList = new ArrayList<>();


}

