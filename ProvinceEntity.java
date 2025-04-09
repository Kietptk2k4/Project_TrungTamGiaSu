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
@Table(name = "province")
public class ProvinceEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer province_id;

	@Column(name = "name", nullable = false)
	private String name;
	
	@OneToMany(mappedBy = "provinceOfDistrict",fetch = FetchType.LAZY )
	private List<DistrictEntity> districtOfProvinceList = new ArrayList<>();
}
