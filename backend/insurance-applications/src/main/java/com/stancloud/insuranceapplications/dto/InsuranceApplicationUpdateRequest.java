package com.stancloud.insuranceapplications.dto;

import com.stancloud.insuranceapplications.models.ApprovalStatus;
import com.stancloud.insuranceapplications.models.Currency;
import com.stancloud.insuranceapplications.models.InsuranceType;
import lombok.Data;

import java.math.BigInteger;
import java.time.Duration;
import java.time.LocalDate;
import java.util.Date;

@Data
public class InsuranceApplicationUpdateRequest {
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
  private Long approvedBy;
  private Date approvalDate;
}
