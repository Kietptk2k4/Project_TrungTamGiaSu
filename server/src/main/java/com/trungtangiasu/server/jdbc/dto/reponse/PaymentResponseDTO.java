package com.trungtangiasu.server.jdbc.dto.reponse;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentResponseDTO  implements Serializable{
    private String status;
    private String message;
    private String URL;
    
}
