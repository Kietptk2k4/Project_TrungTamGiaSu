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
@Table(name = "ward")
public class WardEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String ward_id;
	
	@Column(name = "name", nullable = false)
	private String name;
	
	@ManyToOne
	@JoinColumn(name="district_id", nullable = false)
	private DistrictEntity districtOfWard;
	
	@OneToMany(mappedBy = "wardOfRequest",fetch = FetchType.LAZY )
	private List<TutoringRequestEntity> tutorRequestOfWardList = new ArrayList<>();

}
