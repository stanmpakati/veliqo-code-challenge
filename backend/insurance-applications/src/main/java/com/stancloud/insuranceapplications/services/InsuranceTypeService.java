package com.stancloud.insuranceapplications.services;

import com.stancloud.insuranceapplications.dto.PaginatedResponse;
import com.stancloud.insuranceapplications.dto.PaginationLink;
import com.stancloud.insuranceapplications.dto.insuranceType.InsuranceTypeDto;
import com.stancloud.insuranceapplications.dto.insuranceType.InsuranceTypeRequest;
import com.stancloud.insuranceapplications.dto.insuranceType.InsuranceTypeUpdateRequest;
import com.stancloud.insuranceapplications.models.InsuranceApplication;
import com.stancloud.insuranceapplications.models.InsuranceType;
import com.stancloud.insuranceapplications.models.enums.ApprovalStatus;
import com.stancloud.insuranceapplications.models.enums.Currency;
import com.stancloud.insuranceapplications.repository.InsuranceRepository;
import com.stancloud.insuranceapplications.response.CustomException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class InsuranceTypeService {
  private InsuranceRepository insuranceRepository;

  public InsuranceTypeDto createInsurance(InsuranceTypeRequest insuranceTypeRequest) {
    InsuranceType insuranceType = InsuranceType.builder()
        .name(insuranceTypeRequest.getName())
        .description(insuranceTypeRequest.getDescription())
        .amount(insuranceTypeRequest.getAmount())
        .currency(insuranceTypeRequest.getCurrency())
        .isActive(insuranceTypeRequest.isActive())
        .hasExpiryDate(insuranceTypeRequest.isHasExpiryDate())
        .paymentPeriod(insuranceTypeRequest.getPaymentPeriod())
        .build();

    return InsuranceTypeDto.of(insuranceRepository.save(insuranceType));
  }

  public InsuranceTypeDto getInsurance(Long insuranceId) {
    InsuranceType insuranceType = insuranceRepository.findById(insuranceId)
        .orElseThrow(() -> CustomException.notFound("Insurance not found"));

    return InsuranceTypeDto.of(insuranceType);
  }

  public PaginatedResponse<InsuranceTypeDto> getAllInsurance(Boolean isActive, Currency currency, Boolean hasExpiryDate, int page, int size) {
    Example<InsuranceType> insuranceTypeExample = getInsurancexample(isActive, currency, hasExpiryDate);

//    List<InsuranceType> insuranceTypes = insuranceRepository.findAll(insuranceTypeExample);
    Pageable pageable = PageRequest.of(page - 1, size, Sort.by("name").descending());
    Page<InsuranceType> insuranceTypePage = insuranceRepository.findAll(pageable);


    PaginationLink link = new PaginationLink(
        insuranceTypePage.getTotalPages(),
        insuranceTypePage.getTotalElements(),
        page,
        size);

    return new PaginatedResponse<>(InsuranceTypeDto.of(insuranceTypePage.getContent()), link);
  }

  public InsuranceTypeDto updateInsurance(Long insuranceId, InsuranceTypeUpdateRequest insuranceTypeUpdate) {
    InsuranceType insuranceType = insuranceRepository.findById(insuranceId)
        .orElseThrow(() -> CustomException.notFound("Insurance not found"));

    if(insuranceTypeUpdate.getName() != null) insuranceType.setName(insuranceTypeUpdate.getName());
    if(insuranceTypeUpdate.getDescription() != null) insuranceType.setDescription(insuranceTypeUpdate.getDescription());
    if(insuranceTypeUpdate.getAmount() != null) insuranceType.setAmount(insuranceTypeUpdate.getAmount());
    if(insuranceTypeUpdate.getCurrency() != null) insuranceType.setCurrency(insuranceTypeUpdate.getCurrency());
    if(insuranceTypeUpdate.getIsActive() != null) insuranceType.setActive(insuranceTypeUpdate.getIsActive());
    if(insuranceTypeUpdate.getHasExpiryDate() != null) insuranceType.setHasExpiryDate(insuranceTypeUpdate.getHasExpiryDate());
    if(insuranceTypeUpdate.getPaymentPeriod() != null) insuranceType.setPaymentPeriod(insuranceTypeUpdate.getPaymentPeriod());

    return InsuranceTypeDto.of(insuranceRepository.save(insuranceType));
  }

  public void deleteInsurance(Long insuranceId) {
    InsuranceType insuranceType = insuranceRepository.findById(insuranceId)
        .orElseThrow(() -> CustomException.notFound("Insurance not found"));

    insuranceRepository.delete(insuranceType);
  }

  private Example<InsuranceType> getInsurancexample(Boolean isActive, Currency currency, Boolean hasExpiryDate) {
    InsuranceType insuranceTypeQuery = new InsuranceType();

    if(isActive != null) insuranceTypeQuery.setActive(isActive);
    if(currency != null) insuranceTypeQuery.setCurrency(currency);
    if(hasExpiryDate != null) insuranceTypeQuery.setHasExpiryDate(hasExpiryDate);

    return Example.of(insuranceTypeQuery);
  }
}
