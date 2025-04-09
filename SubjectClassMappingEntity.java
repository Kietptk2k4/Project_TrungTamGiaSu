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
@Table(name = "subject_class_mapping")
public class SubjectClassMappingEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer subject_class_id;
	@Column(name = "subject_id", nullable = false, unique = true)
	private Integer subject_id;
	@Column(name = "class_id", nullable = false, unique = true)
	private Integer class_id;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "subject_class_mapping_tutor",
	            joinColumns = @JoinColumn(name = "subject_class_mapping_id", nullable = false),
	            inverseJoinColumns = @JoinColumn(name = "tutor_id", nullable = false))
	    private List<TutorEntity> tutorOfSubjectClassMappingList = new ArrayList<>();

	@OneToMany(mappedBy = "classOfRequest",fetch = FetchType.LAZY )
	private List<TutoringRequestEntity> requestOfClassList = new ArrayList<>();
}
