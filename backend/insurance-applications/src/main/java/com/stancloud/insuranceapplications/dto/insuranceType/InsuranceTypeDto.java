package com.stancloud.insuranceapplications.dto.insuranceType;

import com.stancloud.insuranceapplications.models.InsuranceType;
import com.stancloud.insuranceapplications.models.enums.Currency;
import com.stancloud.insuranceapplications.models.enums.PaymentPeriod;
import lombok.Builder;
import lombok.Data;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class InsuranceTypeDto {
  private Long id;
  private String name;
  private String description;
  private BigInteger amount;
  private Currency currency;
  private boolean isActive;
  private boolean hasExpiryDate;
  private PaymentPeriod paymentPeriod;
  private LocalDate createdAt;

  public static InsuranceTypeDto of(InsuranceType type) {
    return InsuranceTypeDto.builder()
        .id(type.getId())
        .name(type.getName())
        .description(type.getDescription())
        .amount(type.getAmount())
        .currency(type.getCurrency())
        .isActive(type.isActive())
        .hasExpiryDate(type.isHasExpiryDate())
        .paymentPeriod(type.getPaymentPeriod())
        .createdAt(type.getCreatedAt())
        .build();
  }

  public static List<InsuranceTypeDto> of(List<InsuranceType> insuranceTypes) {
    return insuranceTypes.stream().map(InsuranceTypeDto::of).toList();
  }
}
