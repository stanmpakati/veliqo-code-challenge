package com.stancloud.insuranceapplications.dto.insuranceApplications;

import com.stancloud.insuranceapplications.dto.insuranceType.InsuranceTypeDto;
import com.stancloud.insuranceapplications.models.InsuranceApplication;
import com.stancloud.insuranceapplications.models.enums.ApprovalStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class InsuranceApplicationDto {
  private Long id;
  private InsuranceTypeDto insuranceType;
  private String applicationPlea;
  private LocalDate startDate;
  private LocalDate expiryDate;
  private ApprovalStatus status;
  private String denialNote;
  private Long applicantId;
  private Long approvedBy;
  private LocalDate approvalDate;
  private LocalDate createdAt;


  public static InsuranceApplicationDto of(InsuranceApplication insuranceApplication) {
    return InsuranceApplicationDto.builder()
    .id(insuranceApplication.getId())
    .applicationPlea(insuranceApplication.getApplicationPlea())
    .startDate(insuranceApplication.getStartDate())
    .expiryDate(insuranceApplication.getExpiryDate())
    .insuranceType(InsuranceTypeDto.of(insuranceApplication.getInsuranceType()))
    .status(insuranceApplication.getStatus())
    .denialNote(insuranceApplication.getDenialNote())
    .applicantId(insuranceApplication.getApplicantId())
    .approvedBy(insuranceApplication.getApprovedBy())
    .approvalDate(insuranceApplication.getApprovalDate())
    .createdAt(insuranceApplication.getCreatedAt())
    .build();
  }

  public static List<InsuranceApplicationDto> of(List<InsuranceApplication> insuranceApplicationApplications) {
    return insuranceApplicationApplications.stream().map(InsuranceApplicationDto::of).toList();
  }
}
