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
@Table(name = "account")

public class AccountEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer user_id;
	
	@Column(name = "unread_notifications", nullable = false)
	private Integer unread_notifications ;
	
	@Column(name = "is_active", nullable = false)
	private Integer is_active; 
	
	@Column(name = "created_at", nullable = false)
	private LocalDateTime  created_at;
	
	@Column(name = "user_name", nullable = false, unique = true)
	private String user_name;
	
	@Column(name = "email", nullable = false, unique = true)
	private String email;
	
	@Column(name = "hashed_password", nullable = false, unique = true)
	private String hashed_password;

	@ManyToOne
	@JoinColumn(name="role_id", nullable = false)
	private RoleEntity role;
	
	@OneToMany(mappedBy = "accountPayment",fetch = FetchType.LAZY )
	private List<PaymentEntity> accounPaymentList = new ArrayList<>();
	
	@OneToMany(mappedBy = "accountOfNotification",fetch = FetchType.LAZY )
	private List<NotificationEntity> notificationOfAccountList = new ArrayList<>();
}
