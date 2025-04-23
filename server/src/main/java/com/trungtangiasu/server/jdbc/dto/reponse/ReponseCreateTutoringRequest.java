package com.trungtangiasu.server.jdbc.dto.reponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReponseCreateTutoringRequest {
    String message;
    String status;
}
