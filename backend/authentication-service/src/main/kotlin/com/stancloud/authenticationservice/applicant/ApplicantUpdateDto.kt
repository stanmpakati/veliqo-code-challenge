package com.stancloud.authenticationservice.applicant

import com.stancloud.authenticationservice.applicant.enums.MaritalStatus
import com.stancloud.authenticationservice.applicant.enums.UserSex
import java.util.*

data class ApplicantUpdateDto (
  val firstName: String?,
  val middleNames: String?,
  val lastName: String?,
  val street: String?,
  val suburb: String?,
  val city: String?,
  val country: String?,
  val postalCode: String?,
  val sex: UserSex?,
  val maritalStatus: MaritalStatus?,
  val occupation: String?,
  val mobileNumber: String?,
  val dob: Date?,
  val nationality: String?,
  val numberOfDependents: Int?,
)