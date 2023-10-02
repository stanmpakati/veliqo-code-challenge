package com.stancloud.insuranceapplications.dto.insuranceType;

import com.stancloud.insuranceapplications.models.enums.Currency;
import com.stancloud.insuranceapplications.models.enums.PaymentPeriod;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigInteger;

@Data
public class InsuranceTypeRequest {
  @NotNull()
  private String name;
  private String description;
  private BigInteger amount;
  private Currency currency;
  private boolean isActive = true;
  private boolean hasExpiryDate = false;
  private PaymentPeriod paymentPeriod;
}
