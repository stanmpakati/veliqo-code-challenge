package com.stancloud.insuranceapplications.models;

import com.stancloud.insuranceapplications.models.enums.ApprovalStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.util.Objects;

@Getter
@Setter
@ToString
@Entity
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class InsuranceApplication {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @Column(name = "application_plea")
  private String applicationPlea;

  @Column(name = "start_date", nullable = false)
  private LocalDate startDate;

  @Column(name = "expiry")
  private LocalDate expiryDate;

  @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.DETACH)
  @JoinColumn(nullable = false)
  private InsuranceType insuranceType;

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
  private LocalDate approvalDate;

  @CreationTimestamp
  private LocalDate createdAt;

  @UpdateTimestamp
  private LocalDate updatedAt;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    InsuranceApplication insuranceApplication = (InsuranceApplication) o;
    return id != null && Objects.equals(id, insuranceApplication.id);
  }

  @Override
  public int hashCode() {
    return getClass().hashCode();
  }
}
