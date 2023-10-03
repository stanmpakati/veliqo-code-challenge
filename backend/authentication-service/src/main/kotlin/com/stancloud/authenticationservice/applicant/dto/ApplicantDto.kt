package com.stancloud.authenticationservice.applicant.dto;

import com.stancloud.authenticationservice.applicant.Address
import com.stancloud.authenticationservice.applicant.Applicant
import com.stancloud.authenticationservice.applicant.enums.MaritalStatus
import com.stancloud.authenticationservice.applicant.enums.UserSex
import com.stancloud.authenticationservice.user.User
import java.util.*

class  ApplicantDto (
  val applicantId: Long?,
  val user: User,
  val address: Address?,
  val sex: UserSex?,
  val maritalStatus: MaritalStatus?,
  val occupation: String?,
  val mobileNumber: String?,
  val dob: Date?,
  val nationality: String?,
  val numberOfDependents: Int?,
  ) {
    constructor(applicant : Applicant) : this(
      applicant.applicantId,
      applicant.user,
      applicant.address,
      applicant.sex,
      applicant.maritalStatus,
      applicant.occupation,
      applicant.mobileNumber,
      applicant.dob,
      applicant.nationality,
      applicant.numberOfDependents
    )

}
