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
@Table(name = "district")
public class DistrictEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String district_id;
	
	@Column(name = "name", nullable = false)
	private String name;
	
	@ManyToOne
	@JoinColumn(name="province_id", nullable = false)
	private ProvinceEntity provinceOfDistrict;
	
	@OneToMany(mappedBy = "districtOfWard",fetch = FetchType.LAZY )
	private List<WardEntity> wardOfDistrictlist = new ArrayList<>();
}
