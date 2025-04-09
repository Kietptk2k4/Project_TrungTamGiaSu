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
@Table(name = "notification")
public class NotificationEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer notification_id;
	
	@Column(name = "is_read", nullable = false)
	private Integer is_read;

	@Column(name = "content", nullable = false)
	private String content;
	
	@Column(name = "created_at", nullable = false)
	private LocalDateTime created_at;

	@ManyToOne
	@JoinColumn(name="account_id", nullable = false)
	private AccountEntity accountOfNotification;
}
