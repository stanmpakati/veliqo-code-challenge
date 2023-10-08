package com.stancloud.authenticationservice.applicant

import com.stancloud.authenticationservice.applicant.dto.ApplicantDto
import com.stancloud.authenticationservice.user.UserRepository
import org.springframework.stereotype.Service
import kotlin.jvm.optionals.getOrElse

@Service
class ApplicantService(
  private val applicantRepository: ApplicantRepository,
) {
  fun getApplicant(applicantId: Long): ApplicantDto {
    val applicant = applicantRepository.findById(applicantId)
      .getOrElse { throw Exception("Applicant Not Found") };

    return ApplicantDto(applicant)
  }

  fun getApplicantByUser(userId: Long): ApplicantDto {

    val applicant = applicantRepository.findByUser_Id(userId)
      .getOrElse { throw Exception("Applicant Not Found") };

    return ApplicantDto(applicant)
  }

  fun updateApplicant(applicantId: Long, applicantUpdate: ApplicantDto): ApplicantDto {
    val applicant = applicantRepository.findById(applicantId)
      .getOrElse { throw Exception("Applicant Not Found") };

    val updatedUser = applicant.user?.copy(
      firstName = applicantUpdate.user.firstName,
      middleNames = applicantUpdate.user.middleNames,
      lastName = applicantUpdate.user.lastName
    )

    val updatedAddress = applicant.address?.copy(
      street = applicantUpdate.address?.street,
      suburb = applicantUpdate.address?.street,
      city = applicantUpdate.address?.street,
      country = applicantUpdate.address?.street,
      postalCode = applicantUpdate.address?.street,
    )

    val updatedApplicant = updatedUser?.let {
      applicant.copy(
        sex = applicantUpdate.sex,
        maritalStatus = applicantUpdate.maritalStatus,
        dob = applicantUpdate.dob,
        mobileNumber = applicantUpdate.mobileNumber,
        occupation = applicantUpdate.occupation,
        nationality = applicantUpdate.nationality,
        numberOfDependents = applicantUpdate.numberOfDependents,
        user = it,
        address = updatedAddress
      )
    }

    return ApplicantDto(applicantRepository.save(applicant))
  }

  fun getApplicants(): List<ApplicantDto> {
    val applicants = applicantRepository.findAll()
    return applicants.stream().map { applicant -> ApplicantDto(applicant) }.toList()
  }
}