package com.stancloud.authenticationservice.applicant;

import com.fasterxml.jackson.annotation.JsonManagedReference
import com.stancloud.authenticationservice.applicant.enums.MaritalStatus
import com.stancloud.authenticationservice.applicant.enums.UserSex
import com.stancloud.authenticationservice.user.User
import jakarta.persistence.*
import java.util.*

@Entity
data class Applicant (
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  val applicantId: Long?,

  @OneToOne(cascade = [CascadeType.DETACH, CascadeType.MERGE])
  @JoinColumn(nullable = false)
  val user: User,

  @OneToOne(cascade = [CascadeType.ALL])
  val address: Address?,

  @Enumerated(EnumType.STRING)
  val sex: UserSex?,

  @Enumerated(EnumType.STRING)
  val maritalStatus: MaritalStatus?,

  val occupation: String?,
  val mobileNumber: String?,
  val dob: Date?,
  val nationality: String?,
  val numberOfDependents: Int?,

  ) {
  constructor(user: User) : this(
    null, user, null, null, null, null, null, null, null, null
  )
}
