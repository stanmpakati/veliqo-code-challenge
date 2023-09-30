package com.stancloud.insuranceapplications.dto;

import com.stancloud.insuranceapplications.models.ApprovalStatus;
import com.stancloud.insuranceapplications.models.Currency;
import com.stancloud.insuranceapplications.models.Insurance;
import com.stancloud.insuranceapplications.models.InsuranceType;
import lombok.Builder;
import lombok.Data;

import java.math.BigInteger;
import java.time.Duration;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@Builder
public class InsuranceApplicationDto {
  private Long id;
  private String name;
  private String description;
  private BigInteger amount;
  private Currency currency;
  private String applicationPlea;
  private LocalDate startDate;
  private LocalDate expiry;
  private InsuranceType type;
  private ApprovalStatus status;
  private String denialNote;
  private Long applicantId;
  private Long approvedBy;
  private Date approvalDate;
  private Date createdAt;
  private Date updatedAt;


  public static InsuranceApplicationDto of(Insurance insuranceApplication) {
    return InsuranceApplicationDto.builder()
    .id(insuranceApplication.getId())
    .name(insuranceApplication.getName())
    .description(insuranceApplication.getDescription())
    .amount(insuranceApplication.getAmount())
    .currency(insuranceApplication.getCurrency())
    .applicationPlea(insuranceApplication.getApplicationPlea())
    .startDate(insuranceApplication.getStartDate())
    .expiry(insuranceApplication.getExpiry())
    .type(insuranceApplication.getType())
    .status(insuranceApplication.getStatus())
    .denialNote(insuranceApplication.getDenialNote())
    .applicantId(insuranceApplication.getApplicantId())
    .approvedBy(insuranceApplication.getApprovedBy())
    .approvalDate(insuranceApplication.getApprovalDate())
    .createdAt(insuranceApplication.getCreatedAt())
    .updatedAt(insuranceApplication.getUpdatedAt())
    .build();
  }

  public static List<InsuranceApplicationDto> of(List<Insurance> insuranceApplications) {
    return insuranceApplications.stream().map(InsuranceApplicationDto::of).toList();
  }
}
