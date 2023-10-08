package com.stancloud.insuranceapplications.models;

import com.stancloud.insuranceapplications.models.enums.Currency;
import com.stancloud.insuranceapplications.models.enums.PaymentPeriod;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.Objects;

@Getter
@Setter
@ToString
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class InsuranceType {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "description")
  private String description;

  @Column(name = "amount", nullable = false)
  private BigInteger amount;

  @Column(name = "currency", nullable = false)
  @Enumerated(EnumType.STRING)
  private Currency currency;

  @Column(name = "is_active", nullable = false)
  private boolean isActive = true;

  @Column(name = "has_expiry_date", nullable = false)
  private boolean hasExpiryDate = false;

  @Column(name = "payment_period", nullable = false)
  @Enumerated(EnumType.STRING)
  private PaymentPeriod paymentPeriod;

  @CreationTimestamp
  private LocalDate createdAt;

  @UpdateTimestamp
  private LocalDate updatedAt;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    InsuranceType that = (InsuranceType) o;
    return id != null && Objects.equals(id, that.id);
  }

  @Override
  public int hashCode() {
    return getClass().hashCode();
  }
}
