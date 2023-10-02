package com.stancloud.insuranceapplications.dto.insuranceType;

import com.stancloud.insuranceapplications.models.enums.Currency;
import com.stancloud.insuranceapplications.models.enums.PaymentPeriod;
import lombok.Data;

import java.math.BigInteger;

@Data
public class InsuranceTypeUpdateRequest {
  private String name;
  private String description;
  private BigInteger amount;
  private Currency currency;
  private Boolean isActive;
  private Boolean hasExpiryDate;
  private PaymentPeriod paymentPeriod;
}
