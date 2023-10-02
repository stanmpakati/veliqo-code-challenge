package com.stancloud.insuranceapplications.controllers;

import com.stancloud.insuranceapplications.dto.insuranceType.InsuranceTypeDto;
import com.stancloud.insuranceapplications.dto.insuranceType.InsuranceTypeRequest;
import com.stancloud.insuranceapplications.dto.insuranceType.InsuranceTypeUpdateRequest;
import com.stancloud.insuranceapplications.models.enums.Currency;
import com.stancloud.insuranceapplications.services.InsuranceTypeService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/insurance-type")
public class InsuranceTypeController {
  private final InsuranceTypeService insuranceTypeService;

  public InsuranceTypeController(InsuranceTypeService insuranceTypeService) {
    this.insuranceTypeService = insuranceTypeService;
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public InsuranceTypeDto createInsurance(@RequestBody InsuranceTypeRequest insuranceTypeRequest) {
    return insuranceTypeService.createInsurance(insuranceTypeRequest);
  }

  @GetMapping("{insuranceId}")
  public InsuranceTypeDto getInsurance(@PathVariable Long insuranceId) {
    return insuranceTypeService.getInsurance(insuranceId);
  }

  @GetMapping()
  public List<InsuranceTypeDto> getInsuranceTypes(
      @RequestParam(value = "isActive", required = false) Boolean isActive,
      @RequestParam(value = "currency", required = false) Currency currency,
      @RequestParam(value = "hasExpiryDate", required = false) Boolean hasExpiryDate
    ) {
    return insuranceTypeService.getAllInsurance(isActive, currency, hasExpiryDate);
  }

  @PutMapping("{insuranceId}")
  public InsuranceTypeDto updateInsurance(
      @PathVariable Long insuranceId,
      @RequestBody InsuranceTypeUpdateRequest insuranceType
  ) {
    return insuranceTypeService.updateInsurance(insuranceId, insuranceType);
  }

  @DeleteMapping("/{insuranceId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteInsurance(@PathVariable Long insuranceId) {
    insuranceTypeService.deleteInsurance(insuranceId);
  }
}
