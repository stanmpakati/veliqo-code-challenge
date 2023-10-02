package com.stancloud.insuranceapplications.controllers;

import com.stancloud.insuranceapplications.dto.insuranceApplications.InsuranceApplicationRequest;
import com.stancloud.insuranceapplications.dto.insuranceApplications.InsuranceApplicationDto;
import com.stancloud.insuranceapplications.dto.insuranceApplications.InsuranceApplicationUpdateRequest;
import com.stancloud.insuranceapplications.models.enums.ApprovalStatus;
import com.stancloud.insuranceapplications.models.enums.Currency;
import com.stancloud.insuranceapplications.models.InsuranceType;
import com.stancloud.insuranceapplications.services.InsuranceApplicationService;
import org.springframework.data.domain.PageImpl;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/v1/insurance-application")
public class InsuranceApplicationController {
  private final InsuranceApplicationService insuranceApplicationService;

  public InsuranceApplicationController(InsuranceApplicationService insuranceApplicationService) {
    this.insuranceApplicationService = insuranceApplicationService;
  }

  @PostMapping()
  @ResponseStatus(HttpStatus.CREATED)
  public InsuranceApplicationDto createApplication(@RequestBody InsuranceApplicationRequest insuranceApplicationRequest) {
    return insuranceApplicationService.createApplication(insuranceApplicationRequest);
  }

  @GetMapping("{applicationId}")
  public InsuranceApplicationDto getApplication(@PathVariable Long applicationId) {
    return insuranceApplicationService.getApplication(applicationId);
  }

  @GetMapping()
  public PageImpl<InsuranceApplicationDto> getApplications(
      @RequestParam(name = "applicantId", required = false) Long applicantId,
      @RequestParam(name = "approvedBy", required = false) Long approvedBy,
      @RequestParam(name = "currency", required = false) Currency currency,
      @RequestParam(name = "insuranceType", required = false) Long insuranceType,
      @RequestParam(name = "approvalStatus", required = false) ApprovalStatus approvalStatus,
      @RequestParam(name = "approvalDateFrom", defaultValue = "1971-01-01" ) @DateTimeFormat(pattern = "yyyy-MM-dd") Date approvalDateFrom,
      @RequestParam(name = "approvalDateTo", defaultValue = "2100-01-01" ) @DateTimeFormat(pattern = "yyyy-MM-dd") Date approvalDateTo,
      @RequestParam(name = "createdFrom", defaultValue = "1971-01-01" ) @DateTimeFormat(pattern = "yyyy-MM-dd") Date createdFrom,
      @RequestParam(name = "createdTo", defaultValue = "2100-01-01" ) @DateTimeFormat(pattern = "yyyy-MM-dd") Date createdTo,
      @RequestParam(name = "page", required = false, defaultValue = "1") Integer page,
      @RequestParam(name = "size", required = false, defaultValue = "10") Integer size,
      @RequestParam(name = "sortBy", required = false, defaultValue = "createdAt") String sortBy,
      @RequestParam(name = "sortDir", required = false, defaultValue = "desc") String sortDir
  ) {
    return insuranceApplicationService.getApplications(
        applicantId, approvedBy, currency, insuranceType, approvalStatus, approvalDateFrom, approvalDateTo, createdFrom, createdTo, page, size, sortBy, sortDir
    );
  }

  @PutMapping("{applicationId}")
  public InsuranceApplicationDto updateApplication(
      @PathVariable() Long applicationId,
      @RequestBody() InsuranceApplicationUpdateRequest insuranceApplication
  ) {
    return insuranceApplicationService.updateApplication(applicationId, insuranceApplication);
  }

  @DeleteMapping("/{applicationId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteApplication(@PathVariable() Long applicationId) {
    insuranceApplicationService.deleteApplication(applicationId);
  }

}
