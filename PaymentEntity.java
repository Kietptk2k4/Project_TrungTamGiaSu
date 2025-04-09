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
@Table(name = "payment")

public class PaymentEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer payment_id;

	@Column(name = "payment_method", nullable = false)
	private String payment_method;
	
	@Column(name = "transaction_code", nullable = false)
	private String transaction_code;
	
	@Column(name = "payment_status", nullable = false)
	private String payment_status;
	
	@Column(name = "description", nullable = false)
	private String description;
	
	@Column(name = "notes", nullable = false)
	private String notes;

	@Column(name = "amount", nullable = false)
	private Float amount;
	
	@Column(name = "payment_date", nullable = false)
	private LocalDateTime payment_date;
	
	@ManyToOne
	@JoinColumn(name="account_id", nullable = false)
	private AccountEntity accountPayment;

	@ManyToOne
	@JoinColumn(name="course_id", nullable = false)
	private CousrseEntity coursePayment;
	
	@ManyToOne
	@JoinColumn(name="customer_id", nullable = false)
	private CustomerEntity customerOfPayment;

}
