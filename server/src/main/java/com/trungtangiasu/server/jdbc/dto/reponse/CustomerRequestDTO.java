package com.trungtangiasu.server.jdbc.dto.reponse;

public class CustomerRequestDTO {
    private int id;
    private String customer_name;
    private String subject;
    private String class_name;
    private String location;
    private int fee;
    private String created_at;
    private String status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCustomer_name() {
        return customer_name;
    }

    public void setCustomer_name(String customer_name) {
        this.customer_name = customer_name;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getClass_name() {
        return class_name;
    }

    public void setClass_name(String class_name) {
        this.class_name = class_name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getFee() {
        return fee;
    }

    public void setFee(int fee) {
        this.fee = fee;
    }

    public String getCreated_at() {
        return created_at;
    }

    public void setCreated_at(String created_at) {
        this.created_at = created_at;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "CustomerRequestDTO{" +
               "id=" + id +
               ", customer_name='" + customer_name + '\'' +
               ", subject='" + subject + '\'' +
               ", class_name='" + class_name + '\'' +
               ", location='" + location + '\'' +
               ", fee=" + fee +
               ", created_at='" + created_at + '\'' +
               ", status='" + status + '\'' +
               '}';
    }
}
