package com.trungtangiasu.server.service;

import com.trungtangiasu.server.models.RequestSchedule;
import com.trungtangiasu.server.repository.RequestScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestScheduleService {

    @Autowired
    private RequestScheduleRepository requestScheduleRepository;

    public RequestSchedule saveRequestSchedule(RequestSchedule schedule) {
        return requestScheduleRepository.save(schedule);
    }

    public List<RequestSchedule> findSchedulesByRequestId(Integer requestId) {
        return requestScheduleRepository.findByRequestRequestId(requestId);
    }
}
