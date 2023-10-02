package com.stancloud.insuranceapplications.dto.insuranceApplications;

import com.stancloud.insuranceapplications.models.enums.ApprovalStatus;
import com.stancloud.insuranceapplications.models.enums.Currency;
import com.stancloud.insuranceapplications.models.InsuranceType;
import lombok.Data;

import java.math.BigInteger;
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
  private LocalDate expiryDate;
  private Long insuranceTypeId;
  private ApprovalStatus status;
  private String denialNote;
  private Long approvedBy;
  private Date approvalDate;
}
