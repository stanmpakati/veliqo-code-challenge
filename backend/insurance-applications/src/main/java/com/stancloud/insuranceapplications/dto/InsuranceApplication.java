package com.stancloud.insuranceapplications.dto;

import com.stancloud.insuranceapplications.models.ApprovalStatus;
import com.stancloud.insuranceapplications.models.Currency;
import com.stancloud.insuranceapplications.models.InsuranceType;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigInteger;
import java.time.Duration;
import java.time.LocalDate;

@Data
public class InsuranceApplication {

  @NotNull(message = "Name of the application must not be null")
  private String name;

  @NotNull(message = "Description of the application must not be null")
  private String description;

  @NotNull(message = "Amount of the application must not be null")
  private BigInteger amount;


  @NotNull(message = "Currency of the application must not be null")
  private Currency currency;

  private String applicationPlea;

  @NotNull(message = "Start date of the application must not be null")
  private LocalDate startDate;

  private LocalDate expiry;

  @NotNull(message = "The Insurance type of the application must not be null")
  private InsuranceType type;

  @Column(name = "applicant_id", nullable = false)
  private Long applicantId;
}
