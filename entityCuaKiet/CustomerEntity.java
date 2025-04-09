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
@Table(name = "customer")
public class CustomerEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer customerId;
	
	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "gender", nullable = false)
	private String gender;
	
	@Column(name = "address", nullable = false)
	private String address;
	
	@Column(name = "phone_number", nullable = false, unique = true)
	private String phone_number;
	
	@Column(name = "user_id", nullable = false)
	private Integer user_id;

	@OneToMany(mappedBy = "customerTutoringRequest",fetch = FetchType.LAZY )
	private List<CustomerEntity> customerTutoringRequestList = new ArrayList<>();

	@OneToMany(mappedBy = "customerOfPayment",fetch = FetchType.LAZY )
	private List<PaymentEntity> paymentOfCustomer = new ArrayList<>();
}
