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
@Table(name = "class")
public class ClassEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer class_id;
	
	@Column(name = "class_name", nullable = false)
	private String class_name;
}
