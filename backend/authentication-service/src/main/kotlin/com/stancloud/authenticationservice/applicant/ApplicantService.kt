package com.stancloud.authenticationservice.applicant

import com.stancloud.authenticationservice.applicant.dto.ApplicantDto
import com.stancloud.authenticationservice.user.UserRepository
import org.springframework.stereotype.Service
import kotlin.jvm.optionals.getOrElse

@Service
class ApplicantService(
  private val applicantRepository: ApplicantRepository,
  private val userRepository: UserRepository,
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

  fun updateApplicant(applicantId: Long, applicantUpdate: ApplicantUpdateDto): ApplicantDto {
    val applicant = applicantRepository.findById(applicantId)
      .getOrElse { throw Exception("Applicant Not Found") };

    val updatedUser = applicantUpdate.firstName?.let {
      applicantUpdate.middleNames?.let { it1 ->
        applicantUpdate.lastName?.let { it2 ->
          applicant.user.copy(
            firstName = it,
            middleNames = it1,
            lastName = it2
          )
        }
      }
    }

    if (updatedUser != null) userRepository.save(updatedUser)

    val updatedAddress = applicant.address?.copy(
      street = applicantUpdate.street,
      suburb = applicantUpdate.suburb,
      city = applicantUpdate.city,
      country = applicantUpdate.country,
      postalCode = applicantUpdate.postalCode,
    )

    val updatedApplicant = applicant.copy(
      sex = applicantUpdate.sex,
      maritalStatus = applicantUpdate.maritalStatus,
      dob = applicantUpdate.dob,
      mobileNumber = applicantUpdate.mobileNumber,
      occupation = applicantUpdate.occupation,
      nationality = applicantUpdate.nationality,
      numberOfDependents = applicantUpdate.numberOfDependents,
      address = updatedAddress
    )

    return ApplicantDto(applicantRepository.save(updatedApplicant))
  }

  fun getApplicants(): List<ApplicantDto> {
    val applicants = applicantRepository.findAll()
    return applicants.stream().map { applicant -> ApplicantDto(applicant) }.toList()
  }
}