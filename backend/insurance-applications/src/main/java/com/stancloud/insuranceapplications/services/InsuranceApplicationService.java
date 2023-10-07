package com.stancloud.insuranceapplications.services;

import com.stancloud.insuranceapplications.dto.PaginatedResponse;
import com.stancloud.insuranceapplications.dto.PaginationLink;
import com.stancloud.insuranceapplications.dto.insuranceApplications.InsuranceApplicationRequest;
import com.stancloud.insuranceapplications.dto.insuranceApplications.InsuranceApplicationDto;
import com.stancloud.insuranceapplications.dto.insuranceApplications.InsuranceApplicationUpdateRequest;
import com.stancloud.insuranceapplications.models.InsuranceApplication;
import com.stancloud.insuranceapplications.models.enums.ApprovalStatus;
import com.stancloud.insuranceapplications.models.enums.Currency;
import com.stancloud.insuranceapplications.models.InsuranceType;
import com.stancloud.insuranceapplications.repository.InsuranceApplicationRepository;
import com.stancloud.insuranceapplications.repository.InsuranceRepository;
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
  private final InsuranceRepository insuranceRepository;

  public InsuranceApplicationDto createApplication(InsuranceApplicationRequest insuranceApplicationRequest) {
    InsuranceType insurance = insuranceRepository.findById(insuranceApplicationRequest.getInsuranceTypeId())
        .orElseThrow(() -> CustomException.notFound("Insurance Not Found"));

    if(!insurance.isActive()) throw CustomException.badRequest("Sorry, the insurance has been suspended");

    InsuranceApplication insuranceApplication = InsuranceApplication.builder()
        .applicationPlea(insuranceApplicationRequest.getApplicationPlea())
        .startDate(insuranceApplicationRequest.getStartDate())
        .expiryDate(insuranceApplicationRequest.getExpiryDate())
        .insuranceType(insurance)
        .applicantId(insuranceApplicationRequest.getApplicantId())
        .status(ApprovalStatus.PENDING)
        .build();

    return InsuranceApplicationDto.of(applicationsRepository.save(insuranceApplication));
  }

  public InsuranceApplicationDto getApplication(Long applicationId) {
    InsuranceApplication insuranceApplication = applicationsRepository.findById(applicationId)
        .orElseThrow(() -> CustomException.notFound("Application with id " + applicationId + " not found"));

    return InsuranceApplicationDto.of(insuranceApplication);
  }

  //Todo: Separate fields that can be changed between user and admin
  public InsuranceApplicationDto updateApplication(Long applicationId, InsuranceApplicationUpdateRequest insuranceApplication) {
    InsuranceApplication insurance = applicationsRepository.findById(applicationId)
        .orElseThrow(() -> CustomException.notFound("Application with id " + applicationId + " not found"));

    if(insuranceApplication.getApplicationPlea() != null) insurance.setApplicationPlea(insuranceApplication.getApplicationPlea());
    if(insuranceApplication.getExpiryDate() != null) insurance.setExpiryDate(insuranceApplication.getExpiryDate());
    if(insuranceApplication.getStartDate() != null) insurance.setStartDate(insuranceApplication.getStartDate());
    if(insuranceApplication.getStatus() != null) insurance.setStatus(insuranceApplication.getStatus());
    if(insuranceApplication.getDenialNote() != null) insurance.setDenialNote(insuranceApplication.getDenialNote());
    if(insuranceApplication.getApprovedBy() != null) insurance.setApprovedBy(insuranceApplication.getApprovedBy());

    if(insuranceApplication.getInsuranceTypeId() != null) {
      InsuranceType insuranceType = insuranceRepository.findById(insuranceApplication.getInsuranceTypeId())
          .orElseThrow(() -> CustomException.notFound("Insurance Not Found"));

      insurance.setInsuranceType(insuranceType);
    }

    return InsuranceApplicationDto.of(applicationsRepository.save(insurance));
  }

  public void deleteApplication(Long applicationId) {
    InsuranceApplication insuranceApplication = applicationsRepository.findById(applicationId)
        .orElseThrow(() -> CustomException.notFound("Application not found"));
    
    applicationsRepository.delete(insuranceApplication);
  }

  public PaginatedResponse<InsuranceApplicationDto> getApplications(
       Long applicantId,
       Long approvedBy,
       Currency currency,
       Long insuranceType,
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
    Example<InsuranceApplication> insuranceExample = getInsurancexample(applicantId, approvedBy, insuranceType, approvalStatus);

    Specification<InsuranceApplication> bookSpec = getSpecFromDatesAndExample(
        approvalDateFrom,
        approvalDateTo,
        createdFrom,
        createdTo,
        insuranceExample
    );

    Pageable pageable = PageRequest.of(page - 1, size, Sort.by(sortBy).descending());
//    Page<InsuranceApplication> insurancePage = applicationsRepository.findAll(bookSpec, pageable);
    Page<InsuranceApplication> insurancePage = applicationsRepository.findAll(pageable);


    PaginationLink link = new PaginationLink(
        insurancePage.getTotalPages(),
        insurancePage.getTotalElements(),
        page,
        size);

    return new PaginatedResponse<>(InsuranceApplicationDto.of(insurancePage.getContent()), link);
  }

  @NotNull
  private Example<InsuranceApplication> getInsurancexample(Long applicantId, Long approvedBy, Long insuranceType, ApprovalStatus approvalStatus) {
    InsuranceApplication insuranceApplicationQuery = new InsuranceApplication();

    if(applicantId != null) insuranceApplicationQuery.setApplicantId(applicantId);
    if(approvedBy != null) insuranceApplicationQuery.setApprovedBy(approvedBy);
    if(approvalStatus != null) insuranceApplicationQuery.setStatus(approvalStatus);
    if(insuranceType != null) {
      InsuranceType insurance = insuranceRepository.findById(insuranceType)
              .orElseThrow(() -> CustomException.notFound("Insurance Type Not found"));
      insuranceApplicationQuery.setInsuranceType(insurance);
    }

    return Example.of(insuranceApplicationQuery);
  }

  private Specification<InsuranceApplication> getSpecFromDatesAndExample(
      Date approvalDateFrom,
      Date approvalDateTo,
      Date createdFrom,
      Date createdTo,
      Example<InsuranceApplication> example
  ) {
    return (root, query, builder) -> {
      final List<Predicate> predicates = new ArrayList<>();

      predicates.add(builder.between(root.get("approvalDate"), approvalDateFrom, approvalDateTo));
      predicates.add(builder.between(root.get("createdAt"), createdFrom, createdTo));

      predicates.add(QueryByExamplePredicateBuilder.getPredicate(root, builder, example));

      return builder.and(predicates.toArray(new Predicate[0]));
    };
  }
}
