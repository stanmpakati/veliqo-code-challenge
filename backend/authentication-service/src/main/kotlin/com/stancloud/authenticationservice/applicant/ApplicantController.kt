package com.stancloud.authenticationservice.applicant

import com.stancloud.authenticationservice.applicant.dto.ApplicantDto
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@CrossOrigin("**")
@RestController
@RequestMapping("/api/v1/applicant")
class ApplicantController(
  private val applicantService: ApplicantService,
) {
  @GetMapping("/applicantId")
  fun getApplicant(@PathVariable applicantId: Long): ApplicantDto {
    return applicantService.getApplicant(applicantId)
  }

  @PutMapping("/applicantId")
  fun updateApplicant(@PathVariable applicantId: Long, @RequestBody applicant: ApplicantDto): ApplicantDto {
    return applicantService.updateApplicant(applicantId, applicant)
  }

  @GetMapping
  fun getApplicants(): List<ApplicantDto> {
    return applicantService.getApplicants()
  }
}