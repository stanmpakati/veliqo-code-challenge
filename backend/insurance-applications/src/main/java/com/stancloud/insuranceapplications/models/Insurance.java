package com.stancloud.insuranceapplications.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigInteger;
import java.time.Duration;
import java.time.LocalDate;
import java.util.Date;
import java.util.Objects;

@Getter
@Setter
@ToString
@Entity
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class Insurance {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @Column(name = "id", nullable = false)
  private Long id;

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "description", nullable = false)
  private String description;

  @Column(name = "amount", nullable = false)
  private BigInteger amount;

  @Column(name = "currency", nullable = false)
  @Enumerated(EnumType.STRING)
  private Currency currency;

  @Column(name = "application_plea")
  private String applicationPlea;

  @Column(name = "start_date", nullable = false)
  private LocalDate startDate;

  @Column(name = "expiry")
  private LocalDate expiry;

  @Column(name = "type", nullable = false)
  @Enumerated(EnumType.STRING)
  private InsuranceType type;

  @Column(name = "status", nullable = false)
  @Enumerated(EnumType.STRING)
  private ApprovalStatus status = ApprovalStatus.PENDING;

  @Column(name = "denial_note")
  private String denialNote;

  @Column(name = "applicant_id", nullable = false)
  private Long applicantId;

  @Column(name = "approved_by")
  private Long approvedBy;

  @Column(name = "approval_date")
  private Date approvalDate;

  @CreationTimestamp
  private Date createdAt;

  @UpdateTimestamp
  private Date updatedAt;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    Insurance insurance = (Insurance) o;
    return id != null && Objects.equals(id, insurance.id);
  }

  @Override
  public int hashCode() {
    return getClass().hashCode();
  }
}
