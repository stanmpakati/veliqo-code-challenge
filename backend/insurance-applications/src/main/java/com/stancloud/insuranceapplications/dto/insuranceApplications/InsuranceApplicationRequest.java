package com.stancloud.insuranceapplications.dto.insuranceApplications;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class InsuranceApplicationRequest {
  private String applicationPlea;

  @NotNull(message = "Start date of the application must not be null")
  private LocalDate startDate;

  private LocalDate expiryDate;

  @NotNull(message = "The InsuranceApplication type of the application must not be null")
  private Long insuranceTypeId;

  @Column(name = "applicant_id", nullable = false)
  private Long applicantId;
}
