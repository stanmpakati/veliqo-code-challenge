package com.stancloud.insuranceapplications.services;

import com.stancloud.insuranceapplications.dto.InsuranceApplication;
import com.stancloud.insuranceapplications.dto.InsuranceApplicationDto;
import com.stancloud.insuranceapplications.dto.InsuranceApplicationUpdateRequest;
import com.stancloud.insuranceapplications.models.ApprovalStatus;
import com.stancloud.insuranceapplications.models.Currency;
import com.stancloud.insuranceapplications.models.Insurance;
import com.stancloud.insuranceapplications.models.InsuranceType;
import com.stancloud.insuranceapplications.repository.InsuranceApplicationRepository;
import com.stancloud.insuranceapplications.response.CustomException;
import jakarta.persistence.criteria.Predicate;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.convert.QueryByExamplePredicateBuilder;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class InsuranceApplicationService {
  private final InsuranceApplicationRepository applicationsRepository;

  public InsuranceApplicationDto createApplication(InsuranceApplication insuranceApplication) {
    Insurance insurance = Insurance.builder()
        .name(insuranceApplication.getName())
        .description(insuranceApplication.getDescription())
        .amount(insuranceApplication.getAmount())
        .currency(insuranceApplication.getCurrency())
        .applicationPlea(insuranceApplication.getApplicationPlea())
        .startDate(insuranceApplication.getStartDate())
        .expiry(insuranceApplication.getExpiry())
        .type(insuranceApplication.getType())
        .applicantId(insuranceApplication.getApplicantId())
        .status(ApprovalStatus.PENDING)
        .build();

    return InsuranceApplicationDto.of(applicationsRepository.save(insurance));
  }

  public InsuranceApplicationDto getApplication(Long applicationId) {
    Insurance insurance = applicationsRepository.findById(applicationId)
        .orElseThrow(() -> CustomException.notFound("Application with id " + applicationId + " not found"));

    return InsuranceApplicationDto.of(insurance);
  }

  //Todo: Separate fields that can be changed between user and admin
  public InsuranceApplicationDto updateApplication(Long applicationId, InsuranceApplicationUpdateRequest insuranceApplication) {
    Insurance insurance = applicationsRepository.findById(applicationId)
        .orElseThrow(() -> CustomException.notFound("Application with id " + applicationId + " not found"));

    if(insuranceApplication.getName() != null) insurance.setName(insuranceApplication.getName());
    if(insuranceApplication.getDescription() != null) insurance.setDescription(insuranceApplication.getDescription());
    if(insuranceApplication.getAmount() != null) insurance.setAmount(insuranceApplication.getAmount());
    if(insuranceApplication.getCurrency() != null) insurance.setCurrency(insuranceApplication.getCurrency());
    if(insuranceApplication.getApplicationPlea() != null) insurance.setApplicationPlea(insuranceApplication.getApplicationPlea());
    if(insuranceApplication.getExpiry() != null) insurance.setExpiry(insuranceApplication.getExpiry());
    if(insuranceApplication.getStartDate() != null) insurance.setStartDate(insuranceApplication.getStartDate());
    if(insuranceApplication.getType() != null) insurance.setType(insuranceApplication.getType());
    if(insuranceApplication.getStatus() != null) insurance.setStatus(insuranceApplication.getStatus());

    return InsuranceApplicationDto.of(applicationsRepository.save(insurance));
  }

  public void deleteApplication(Long applicationId) {
    Insurance insurance = applicationsRepository.findById(applicationId)
        .orElseThrow(() -> CustomException.notFound("Application not found"));
    
    applicationsRepository.delete(insurance);
  }

  public PageImpl<InsuranceApplicationDto> getApplications(
       String name,
       Long applicantId,
       Long approvedBy,
       double maxAmount,
       double minAmount,
       Currency currency,
       InsuranceType insuranceType,
       ApprovalStatus approvalStatus,
       Date approvalDateFrom,
       Date approvalDateTo,
       Date createdFrom,
       Date createdTo,
       Integer page,
       Integer size,
       String sortBy,
       String sortDir
  ) {
    Example<Insurance> insuranceExample = getInsurancexample(name, applicantId, approvedBy, currency, insuranceType, approvalStatus);

    Specification<Insurance> bookSpec = getSpecFromDatesAndExample(
        maxAmount,
        minAmount,
        approvalDateFrom,
        approvalDateTo,
        createdFrom,
        createdTo,
        insuranceExample
    );

    Pageable pageable = PageRequest.of(page - 1, size, Sort.by(sortBy).descending());
    Page<Insurance> insurancePage = applicationsRepository.findAll(bookSpec, pageable);

    List<InsuranceApplicationDto> dtos = InsuranceApplicationDto.of(insurancePage.getContent());

    return new PageImpl<>(dtos, pageable, insurancePage.getTotalElements());
  }

  @NotNull
  private Example<Insurance> getInsurancexample(String name, Long applicantId, Long approvedBy, Currency currency, InsuranceType insuranceType, ApprovalStatus approvalStatus) {
    Insurance insuranceQuery = new Insurance();

    if(name != null) insuranceQuery.setName(name);
    if(applicantId != null) insuranceQuery.setApplicantId(applicantId);
    if(approvedBy != null) insuranceQuery.setApprovedBy(approvedBy);
    if(currency != null) insuranceQuery.setCurrency(currency);
    if(insuranceType != null) insuranceQuery.setType(insuranceType);
    if(approvalStatus != null) insuranceQuery.setStatus(approvalStatus);

    return Example.of(insuranceQuery);
  }

  private Specification<Insurance> getSpecFromDatesAndExample(
      double maxAmount,
      double minAmount,
      Date approvalDateFrom,
      Date approvalDateTo,
      Date createdFrom,
      Date createdTo,
      Example<Insurance> example
  ) {
    return (root, query, builder) -> {
      final List<Predicate> predicates = new ArrayList<>();

      predicates.add(builder.between(root.get("approvalDate"), approvalDateFrom, approvalDateTo));
      predicates.add(builder.between(root.get("createdAt"), createdFrom, createdTo));
      predicates.add(builder.between(root.get("amount"), minAmount, maxAmount));

      predicates.add(QueryByExamplePredicateBuilder.getPredicate(root, builder, example));

      return builder.and(predicates.toArray(new Predicate[0]));
    };
  }
}
